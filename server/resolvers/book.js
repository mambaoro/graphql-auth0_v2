const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    books: async (_, __, { prisma }, info) => {
      try {
        const books = await prisma.query.books(null, info);
        return books;
      } catch (e) {
        throw new Error('Failed to return books list');
      }
    },
    book: async (_, { id }, { prisma }, info) => {
      try {
        const op = {};
        op.where = { id };
        const book = await prisma.query.book(op, info);
        return book;
      } catch (e) {
        throw new Error(`Failed to return book: ${e.message}`);
      }
    },
  },
  Mutation: {
    addBook: async (_, { data }, { prisma, user }, info) => {
      try {
        // eslint-disable-next-line no-unused-vars
        const email = await user;
        if (!user) throw new Error();
        const op = {};
        op.data = {
          title: data.title,
          cover_image_url: data.cover_image_url,
          average_rating: data.average_rating,
          author: {
            connect: { id: data.author },
          },
        };
        const newBook = await prisma.mutation.createBook(op, info);
        return newBook;
      } catch (e) {
        throw new AuthenticationError(
          `You must be logged in to do this: ${e.message}`,
        );
      }
    },
  },
};

module.exports = {
  Query: {
    user: async (_, { id }, { prisma }, info) => {
      try {
        const op = {};
        op.where = { id };
        const user = await prisma.query.user(op, info);
        return user;
      } catch (e) {
        throw new Error(`Failed to return user: ${e.message}`);
      }
    },
  },
  Mutation: {
    addUser: async (_, { data: { name, password } }, { prisma }, info) => {
      try {
        const op = {};
        op.data = {
          name,
          password,
        };
        const newUser = await prisma.mutation.createUser(op, info);
        return newUser;
      } catch (e) {
        throw new Error(`Failed to create user: ${e.message}`);
      }
    },
  },
};

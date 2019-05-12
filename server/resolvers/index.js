const userResolvers = require('./user');
const bookResolvers = require('./book');

// Export an array of resolvers
module.exports = [userResolvers, bookResolvers];

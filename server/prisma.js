const { Prisma } = require('prisma-binding');
const {
  typeDefs,
} = require('../auth0-app/generated/prisma-client/prisma-schema.js');

module.exports = new Prisma({
  endpoint: 'https://eu1.prisma.sh/mamadou-baoro/auth0-app/dev',
  typeDefs,
  secret: 'supersecret',
});

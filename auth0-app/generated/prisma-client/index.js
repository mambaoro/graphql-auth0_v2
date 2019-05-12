/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable strict */
/* eslint-disable lines-around-directive */
/* eslint-disable prettier/prettier */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Book",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/mamadou-baoro/auth0-app/dev`,
  secret: `supersecret`
});
exports.prisma = new exports.Prisma();

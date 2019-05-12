/* eslint-disable import/order */
/* eslint-disable consistent-return */
const express = require('express');

const isDev = process.env.NODE_ENV !== 'production';
const argv = require('./argv');
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const cors = require('cors');
const http = require('http');
const app = express();
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');
// Needed for importing schema.graphql
const { importSchema } = require('graphql-import');
const port = require('./port');
const logger = require('./logger');
const setup = require('./middlewares/frontendMiddleware');

app.use(cors());

const typeDefs = importSchema('server/schema/schema.graphql');
const resolvers = require('./resolvers/index.js');
const prisma = require('./prisma.js');
const { getKey, options } = require('./jwksClient');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = new Promise(resolv => {
      jwt.verify(token, getKey, options, (err, decoded) => {
        if (err);
        // eslint-disable-next-line no-unused-expressions
        decoded ? resolv(decoded.email) : resolv('');
      });
    });
    return { prisma, user };
  },
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
httpServer.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});

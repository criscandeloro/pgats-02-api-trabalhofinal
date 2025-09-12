// app.js para ApolloServer
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers/resolvers');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      if (token) {
        try {
          const user = jwt.verify(token, JWT_SECRET);
          return { user };
        } catch (e) {
          throw new Error('Your session expired. Sign in again.');
        }
      }
    }
    return {};
  },
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer();

module.exports = app;
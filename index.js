import express from 'express';
import { ApolloServer } from 'apollo-server-express';
// import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import models from './models';

// ./graphql/typeDefs.js
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

// ./graphql/resolvers.js
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
  context: {
    models,
    user: {
      id: 1,
    },
  },
});

const app = express();

server.applyMiddleware({ app }); // app is from an existing express app

models.sequelize.sync({}).then(() => {
  app.listen({ port: 8080 }, () => {
    console.log('Server ready');
  });
});

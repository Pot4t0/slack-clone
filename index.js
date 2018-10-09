import express from 'express';
// import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
// import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

// export const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
});
const app = express();

server.applyMiddleware({ app }); // app is from an existing express app

// app.use('/graphql', bodyParser.json(), server);
models.sequelize.sync().then(() => {
  app.listen({ port: 8080 }, () => {
    console.log('Server ready');
  });
});

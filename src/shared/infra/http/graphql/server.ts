


// import { ApolloServer } from '@apollo/server';
// import { gql } from 'graphql-tag';
// import { expressMiddleware } from '@apollo/server/express4';
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import express from 'express';
// import http from 'http';

// import { typeDefs as ForumTypeDefs } from './forum';
// import { typeDefs as UserTypeDefs } from './users';

// const typeDefs = gql`
//   scalar DateTime

//   type Query {
//     _blank: String
//   }
// `;

// const app = express();
// const httpServer = http.createServer(app);
// const server = new ApolloServer({
//   typeDefs: [typeDefs, ForumTypeDefs, UserTypeDefs],
//   resolvers: {
//     DateTime: GraphQLDateTime,
//     Mutation: {
//       createUser: async (parent, args, context) => {
//         const response = await 
//       },
//     },
//     Query: {
//       posts: async (parent, args, context) => {
//         const response = await 
       
//       },
//     },
//   },
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });
// async () =>{
//   await server.start();
// }()

// app.use(
//   '/graphql',
//   expressMiddleware(server, {
//     context: async ({ req }) => ({ token: req.headers.token }),
//   }),
// );

// export function startGraphQLServer(app) {
//   return new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve as () => void));
// }

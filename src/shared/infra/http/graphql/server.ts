


import { getRecentPosts } from '../../../../modules/forum/useCases/post/getRecentPosts';
import { PostDetailsMap } from '../../../../modules/forum/mappers/postDetailsMap';
import { GraphQLDateTime } from 'graphql-iso-date';
import { memberRepo } from '../../../../modules/forum/repos';
import { MemberDetailsMap } from '../../../../modules/forum/mappers/memberDetailsMap';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';

import { typeDefs as ForumTypeDefs } from './forum';
import { typeDefs as UserTypeDefs } from './users';

const typeDefs = gql`
  scalar DateTime

  type Query {
    _blank: String
  }
`;

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs: [typeDefs, ForumTypeDefs, UserTypeDefs],
  resolvers: {
    DateTime: GraphQLDateTime,
    Post: {
      memberPostedBy: async (post, args, context) => {
        const memberDetails = await memberRepo.getMemberDetailsByPostLinkOrSlug(post.slug);
        return MemberDetailsMap.toDTO(memberDetails);
      },
    },
    Query: {
      posts: async (parent, args, context) => {
        const response = await getRecentPosts.execute({});
        if (response.isRight()) {
          const postDetails = response.value.getValue();
          return postDetails.map(PostDetailsMap.toDTO);
        } else {
          throw response.value;
        }
      },
    },
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
async () =>{
  await server.start();
}()

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

export function startGraphQLServer(app) {
  return new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve as () => void));
}

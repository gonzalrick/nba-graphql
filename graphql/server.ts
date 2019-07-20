import { ApolloServer } from 'apollo-server-lambda';

import { createLoaders } from './dataLoaders';
import { NbaAPI } from './dataSource';
import { schema } from './schema/index';

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    nbaAPI: new NbaAPI(),
  }),
  context: {
    loaders: createLoaders(),
  },
});

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});

import ApolloClient from 'apollo-boost';
import * as fetch from 'node-fetch';

// import { getAccessToken } from './getAccessToken';
import { getEndpoint } from './getEndpoint';

let client: ApolloClient<any> | null = null;

export async function getClient() {
  if (client) {
    return client;
  }

  // const accessToken = await getAccessToken();

  client = new ApolloClient({
    uri: 'http://localhost:3001/graphql', //getEndpoint(process.env.NODE_ENV!),
  });

  return client;
}

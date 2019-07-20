const endpoints: { [key: string]: string } = {
  production: 'http://localhost:3001/graphql',
};

export function getEndpoint(environment: string) {
  return endpoints[environment] || 'http://localhost:3001/graphql';
}

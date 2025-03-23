import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8080/query' }), // Change the URL as needed
  cache: new InMemoryCache(),
});

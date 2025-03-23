import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const uri = window.location.hostname.includes('excludetube.com')
  ? 'https://api.excludetube.com/query'
  : 'http://localhost:8080/query';
export const client = new ApolloClient({
  link: new HttpLink({ uri }), // Change the URL as needed
  cache: new InMemoryCache(),
});

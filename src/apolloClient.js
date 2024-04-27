// Import necessary functionalities from the Apollo Client library.
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

/**
 * Creates and configures an instance of ApolloClient.
 * The function selects the GraphQL URI based on the environment directly in the code.
 *
 * @returns {ApolloClient} An ApolloClient instance configured with a HttpLink and InMemoryCache.
 */
const createApolloClient = () => {
  // Select the URI based on the environment (development or production)
  const GRAPHQL_URI = process.env.NODE_ENV === 'production'
    ? 'https://employeeace-api.apratim.me/graphql' // Production URI
    : 'http://localhost:5000/graphql';          // Development URI

  // Create an HttpLink instance to connect to the specified GraphQL server.
  const httpLink = new HttpLink({
    uri: GRAPHQL_URI,
  });

  try {
    // Create and return the ApolloClient instance, configured with the HttpLink and a new in-memory cache.
    return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });
  } catch (error) {
    // Log and rethrow errors during the ApolloClient instantiation.
    console.error('Error creating ApolloClient:', error);
    throw error;
  }
};

export default createApolloClient;
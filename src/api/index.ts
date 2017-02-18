import ApolloClient, { createNetworkInterface } from "apollo-client";
import { DocumentNode } from "graphql";
import gql from "graphql-tag";

interface Query { allTasks: DocumentNode; }
const query = (window as any).__APOLLO_QUERY__ = {
  allTasks: gql`
    query Tasks {
      tasks(first: 5) {
        edges {
          cursor
          node {
            id
            type
            description
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`
} as Query;

// Create the apollo client
const apolloClient = (window as any).__APOLLO_CLIENT__ = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "http://localhost:4000/api",
    opts: {
      transportBatching: true
    }
  })
});

export default {
  allTasks() {
    return apolloClient.query({query: query.allTasks});
  }
};

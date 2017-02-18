import ApolloClient, { createNetworkInterface } from "apollo-client";
import { DocumentNode } from "graphql";

const Tasks = require("./Tasks.graphql") as DocumentNode;

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
    return apolloClient.query({query: Tasks});
  }
};

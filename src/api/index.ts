import ApolloClient, { createNetworkInterface } from "apollo-client"
import { DocumentNode } from "graphql"

/* tslint:disable-next-line:no-var-requires */
const Tasks = require("./Tasks.graphql") as DocumentNode

// Create the apollo client
const apolloClient = (window as any).__APOLLO_CLIENT__ = new ApolloClient({
  networkInterface: createNetworkInterface({
    opts: {
      transportBatching: true,
    },
    uri: "http://localhost:4000/api",
  }),
})

export default {
  allTasks() {
    return apolloClient.query({query: Tasks})
  },
}

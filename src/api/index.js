import ApolloClient, { createBatchingNetworkInterface } from "apollo-client"

import Tasks from './Tasks.graphql'

// Create the apollo client
const apolloClient = (window as any).__APOLLO_CLIENT__ = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: "http://localhost:4000/api",
    batchInterval: 10,
    batchMax: 10,
  }),
})

export default {
  Tasks() {
    return apolloClient.query({query: Tasks, variables: { first: 5 }})
  },
}

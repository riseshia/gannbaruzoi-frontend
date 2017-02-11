// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'
import App from './App'
import gql from 'graphql-tag'

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:4000/api',
    transportBatching: true,
  }),
});

Vue.use(VueApollo, {
  apolloClient,
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  apollo: {
    allTasks: {
      query: gql`query Tasks {
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
    }
  }
})

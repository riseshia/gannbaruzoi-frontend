// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import * as Vue from 'vue'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import * as Vuex from 'vuex'
import App from './App'
import gql from 'graphql-tag'

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:4000/api',
    opts: {
      transportBatching: true,
    }
  }),
});

interface Query { allTasks: any }
(<any>window).__APOLLO_QUERY__ = {
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
} as Query
(<any>window).__APOLLO_CLIENT__ = apolloClient
// window.__APOLLO_CLIENT__.query({query: window.__APOLLO_QUERY__.allTasks})
Vue.use(Vuex)

// extends interface option
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    vuex?: {}
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})

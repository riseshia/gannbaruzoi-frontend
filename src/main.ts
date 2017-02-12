// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import * as Vue from 'vue'
import * as Vuex from 'vuex'
import App from './components/App'

import Api from './api'

Api.allTasks()

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
  components: { App }
})

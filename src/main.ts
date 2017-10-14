// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import Vuex from "vuex"
import Api from "./api"
import App from "./components/App.vue"

Api.allTasks()

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  components: { App },
  el: "#app",
  template: "<App/>",
})

<template>
  <div id="app">
    <img src="../assets/logo.png">
    <todo-list></todo-list>
  </div>
</template>

<script lang="ts">
import * as Vue from "vue"
import Component from "vue-class-component"
import TodoList from "./TodoList"

@Component({
  name: "app",

  components: {
    'todo-list': TodoList,
  },
})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

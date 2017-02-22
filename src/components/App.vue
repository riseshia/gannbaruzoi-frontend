<template>
  <div id="app">
    <img src="../assets/logo.png">
    <todo-list></todo-list>
  </div>
</template>

<script>
import * as Vue from "vue"
import { Component } from "vue-property-decorator"
import TodoList from "./TodoList"

@Component({
  name: "app",
  components: {
    TodoList
  }
})
class App extends Vue {
}
export default App
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

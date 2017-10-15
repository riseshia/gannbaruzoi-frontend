<template>
  <div id="app">
    <img src="./assets/logo.png">
    <task-list/>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList'

export default {
  name: 'app',
  components: {
    TaskList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

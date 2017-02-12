<template>
  <div id="app">
    <img src="../assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
import { Vue, Component } from 'av-ts'
import Hello from './Hello'

@Component({
  name: 'app',
  components: {
    Hello
  }
})
class App extends Vue {
}
export default App
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

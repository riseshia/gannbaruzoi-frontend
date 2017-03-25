<template>
  <li class="todo">
    <input type="checkbox" v-model="instanceStatus">

    <label>
      ( {{ loggedSize }} /<span contenteditable @keydown.enter.prevent.stop="updateEstimatedSize">
      {{ estimatedSize }}
      </span>)
      <span contenteditable @keydown.enter.prevent.stop="updateDescription">
        {{ description }}</span>
      <a href="#" @click.prevent="deleteTodo">[x]</a>
    </label>
  </li>
</template>

<script>
import Todo from "./Todo.ts"
export default Todo
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

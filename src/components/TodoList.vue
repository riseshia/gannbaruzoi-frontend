<template>
  <div class="todo-list">
    <h2>Todo List</h2>
    <input
      type="text"
      v-model="newTodo"
      placeholder="Type new task!"
      @keyup.enter="createTodo">
    <ul>
      <li is="todo"
          v-for="todo in todos"
          :todoId="todo.id"
          :description="todo.description"
          :type="todo.type"
          :estimatedSize="todo.estimatedSize"
          :status="todo.status"
          :loggedSize="todo.logs.length"
      />
    </ul>
  </div>
</template>

<script>
import TodoList from "./TodoList.ts"
export default TodoList
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>

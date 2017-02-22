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
      />
    </ul>
  </div>
</template>

<script>
import * as Vue from "vue"
import { Component } from "vue-property-decorator"
import Todo from "./Todo"

@Component({
  name: "todo-list",
  components: {
    Todo
  }
})
class TodoList extends Vue {
  get todos() {
    return [
      { id: 1, description: "Todo 1", type: "ROOT",
        estimatedSize: 3, status: false },
      { id: 2, description: "Todo 2", type: "ROOT",
        estimatedSize: 1, status: false },
    ]
  }

  newTodo = ""

  createTodo() {
    this.$emit("createTodo", {
      description: this.newTodo,
      estimatedSize: 1
    })
    this.newTodo = ""
  }
}
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

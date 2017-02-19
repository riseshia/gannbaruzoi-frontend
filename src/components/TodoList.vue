<template>
  <div class="todo-list">
    <h2>Todo List</h2>
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
import { Vue, Component } from "av-ts"
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

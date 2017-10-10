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

<script lang="ts">
import * as Vue from "vue"
import Component from "vue-class-component"
import Todo from "./Todo"

@Component({
  name: "todo-list",

  components: {
    'todo': Todo,
  },
})
export default class TodoList extends Vue {
  newTodo = ""

  get todos() {
    return [
      {
        description: "Todo 1",
        estimatedSize: 3,
        id: 1,
        status: false,
        type: "ROOT",
        logs: [
          { id: 1 },
          { id: 2 },
        ],
      },
      {
        description: "Todo 2",
        estimatedSize: 1,
        id: 2,
        status: false,
        type: "ROOT",
        logs: [],
      },
    ]
  }

  createTodo() {
    this.$emit("createTodo", {
      description: this.newTodo,
      estimatedSize: 1,
    })
    this.newTodo = ""
  }
}
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

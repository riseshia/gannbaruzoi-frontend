import * as Vue from "vue"
import { Component } from "vue-property-decorator"
import Todo from "./Todo.vue"

@Component({
  name: "todo-list",
  components: {
    Todo,
  },
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
      estimatedSize: 1,
    })
    this.newTodo = ""
  }
}
export default TodoList

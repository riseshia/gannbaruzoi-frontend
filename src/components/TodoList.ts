import * as Vue from "vue"
import { Component } from "vue-property-decorator"
import Todo from "./Todo.vue"

@Component({
  components: {
    Todo,
  },
  name: "todo-list",
})
class TodoList extends Vue {
  get todos() {
    return [
      {
        description: "Todo 1",
        estimatedSize: 3,
        id: 1,
        status: false,
        type: "ROOT",
      },
      {
        description: "Todo 2",
        estimatedSize: 1,
        id: 2,
        status: false,
        type: "ROOT",
      },
    ]
  }

  private newTodo = ""

  private createTodo() {
    this.$emit("createTodo", {
      description: this.newTodo,
      estimatedSize: 1,
    })
    this.newTodo = ""
  }
}
export default TodoList

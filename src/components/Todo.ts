import * as Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

@Component({
  name: "todo",
})
class Todo extends Vue {
  @Prop({ required: true })
  todoId: number
  @Prop({ required: true })
  description: string
  @Prop({ required: true })
  type: string
  @Prop({ required: true })
  estimatedSize: number
  @Prop({ required: true })
  status: boolean

  instanceStatus = this.status

  @Watch("instanceStatus")
  onInstanceStatusChanged(newVal: boolean) {
    this.$emit("updateTodo", { id: this.todoId, status: newVal })
  }

  updateDescription(e) {
    this.$emit("updateTodo", {
      id: this.todoId, description: e.target.innerText,
    })
  }

  updateEstimatedSize(e) {
    this.$emit("updateTodo", {
      id: this.todoId, estimatedSize: e.target.innerText as number,
    })
  }

  deleteTodo() {
    this.$emit("deleteTodo", { id: this.todoId })
  }
}
export default Todo

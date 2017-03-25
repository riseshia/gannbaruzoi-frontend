import * as Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

@Component({
  name: "todo",
})
class Todo extends Vue {
  @Prop({ required: true })
  private todoId: number
  @Prop({ required: true })
  private description: string
  @Prop({ required: true })
  private type: string
  @Prop({ required: true })
  private estimatedSize: number
  @Prop({ required: true })
  private status: boolean

  private instanceStatus = this.status

  @Watch("instanceStatus")
  private onInstanceStatusChanged(newVal: boolean) {
    this.$emit("updateTodo", { id: this.todoId, status: newVal })
  }

  private updateDescription(e) {
    this.$emit("updateTodo", {
      description: e.target.innerText,
      id: this.todoId,
    })
  }

  private updateEstimatedSize(e) {
    this.$emit("updateTodo", {
      estimatedSize: e.target.innerText as number,
      id: this.todoId,
    })
  }

  private deleteTodo() {
    this.$emit("deleteTodo", { id: this.todoId })
  }
}
export default Todo

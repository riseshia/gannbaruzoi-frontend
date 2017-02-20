<template>
  <li class="todo">
    <input type="checkbox" v-model="instanceStatus">

    <label>
      ({{ estimatedSize }}) {{ description }}
      <a href="#" @click.prevent="deleteTodo">[x]</a>
    </label>
  </li>
</template>

<script>
import { Vue, Component, Prop, p, Watch } from "av-ts"

@Component({
  name: "todo"
})
class Todo extends Vue {
  @Prop todoId        = p({ type: Number, required: true })
  @Prop description   = p({ type: String, required: true })
  @Prop type          = p({ type: String, required: true })
  @Prop estimatedSize = p({ type: Number, required: true })
  @Prop status        = p({ type: Boolean, required: true })

  instanceStatus = this.status

  @Watch("instanceStatus")
  handler(newVal) {
    this.$emit("updateTodo", { id: this.todoId, status: newVal })
  }

  deleteTodo() {
    this.$emit("deleteTodo", { id: this.todoId })
  }
}
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

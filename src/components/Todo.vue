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
import * as Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

@Component({
  name: "todo"
})
class Todo extends Vue {
  instanceStatus = this.status

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

  @Watch("instanceStatus")
  onInstanceStatusChanged(newVal: boolean) {
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

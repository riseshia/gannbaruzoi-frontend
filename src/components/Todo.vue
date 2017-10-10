<template>
  <li class="todo">
    <input type="checkbox" v-model="instanceStatus">

    <label>
      ( {{ loggedSize }} /<span contenteditable @keydown.enter.prevent.stop="updateEstimatedSize">
      {{ estimatedSize }}
      </span>)
      <span contenteditable @keydown.enter.prevent.stop="updateDescription">
        {{ description }}</span>
      <a href="#" @click.prevent="deleteTodo">[x]</a>
    </label>
  </li>
</template>

<script lang="ts">
import * as Vue from "vue"
import Component from "vue-class-component"

@Component({
  name: "todo",

  // watch: {
  //   instanceStatus: {
  //     handler: 'onInstanceStatusChanged',
  //     immediate: true,
  //     deep: false,
  //   },
  // },

  props: {
    todoId: Number,
    description: String,
    estimatedSize: Number,
    type: String,
    loggedSize: Number,
    status: Boolean,
  },
})
export default class Todo extends Vue {
  todoId: number
  description: string
  estimatedSize: number
  type: string
  loggedSize: number
  status: boolean

  instanceStatus: boolean = this.status

  onInstanceStatusChanged(newVal: boolean) {
    this.$emit("updateTodo", { id: this.todoId, status: newVal })
  }

  updateDescription(e) {
    this.$emit("updateTodo", {
      description: e.target.innerText,
      id: this.todoId,
    })
  }

  updateEstimatedSize(e) {
    this.$emit("updateTodo", {
      estimatedSize: e.target.innerText as number,
      id: this.todoId,
    })
  }

  deleteTodo() {
    this.$emit("deleteTodo", { id: this.todoId })
  }
}
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

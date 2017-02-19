<template>
  <li class="todo">
    {{ description }}
  </li>
</template>

<script>
import { Vue, Component, Prop, p } from "av-ts"

@Component({
  name: "todo-list"
})
class Todo extends Vue {
  @Prop todoId        = p({ type: Number, required: true })
  @Prop description   = p({ type: String, required: true })
  @Prop type          = p({ type: String, required: true })
  @Prop estimatedSize = p({ type: Number, required: true })
  @Prop status        = p({ type: Boolean, required: true })
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

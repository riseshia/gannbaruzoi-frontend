import * as Vue from "vue"
import { Component } from "vue-property-decorator"
import TodoList from "./TodoList.vue"

@Component({
  name: "app",
  components: {
    TodoList,
  },
})
class App extends Vue {
}
export default App

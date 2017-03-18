import { assert } from "chai"
import TodoList from "src/components/TodoList"

describe("TodoList.vue", () => {
  let vm

  beforeEach(() => {
    vm = new TodoList().$mount()
  })

  it("renders correct contents", () => {
    const actual = vm.$el.querySelector(".todo-list h2").textContent
    assert.strictEqual(actual, "Todo List")
  })

  it("have 2 computed todos", () => {
    assert.strictEqual(vm.todos.length, 2)
  })
})

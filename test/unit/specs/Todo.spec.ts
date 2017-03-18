import { assert } from "chai"
import Todo from "src/components/Todo"

describe("Todo.vue", () => {
  it("renders currect contents", () => {
    const vm = new Todo({
      propsData: {
        todoId: 1, description: "Todo 1", type: "ROOT",
        estimatedSize: 2, status: false,
      },
    }).$mount()

    const actual = <string> vm.$el.textContent
    assert.include(actual, "Todo 1")
  })
})

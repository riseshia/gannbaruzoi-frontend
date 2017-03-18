import { assert } from "chai"
import Todo from "src/components/Todo"

describe("Todo.vue", () => {
  it("renders currect contents", () => {
    const vm = new Todo({
      propsData: {
        description: "Todo 1",
        estimatedSize: 2,
        status: false,
        todoId: 1,
        type: "ROOT",
      },
    }).$mount()

    const actual = <string> vm.$el.textContent
    assert.include(actual, "Todo 1")
  })
})

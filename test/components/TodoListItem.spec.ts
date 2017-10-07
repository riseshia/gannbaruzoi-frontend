import TodoListItem from "@/components/TodoListItem"

describe("TodoListItem.vue", () => {
  it("renders currect contents", () => {
    const vm = new TodoListItem({
      propsData: {
        description: "Todo 1",
        estimatedSize: 2,
        status: false,
        todoId: 1,
        type: "ROOT",
      },
    }).$mount()

    const actual = vm.$el.textContent as string
    assert.include(actual, "Todo 1")
  })
})

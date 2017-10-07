import Vue from "vue"
import TodoList from "@/components/TodoList"

describe("TodoList.vue", () => {
  let vm = new TodoList()

  it("renders correct contents", () => {
    const actual = vm.$el.querySelector(".todo-list h2").textContent
    expect(actual).toBe("Todo List")
  })

  it("have 2 computed todos", () => {
    expect(vm.todos.length).toBe(2)
  })
})

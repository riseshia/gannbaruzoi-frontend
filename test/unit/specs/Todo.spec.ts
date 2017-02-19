import Todo from "src/components/Todo";
import { assert } from "chai";

describe("Todo.vue", () => {
  it("renders currect contents", () => {
    const vm = new Todo({
      propsData: {
        todoId: 1, description: "Todo 1", type: "ROOT",
        estimatedSize: 2, status: false
      }
    }).$mount();

    const actual = vm.$el.textContent;
    assert.match(actual, /Todo 1/);
  })
});

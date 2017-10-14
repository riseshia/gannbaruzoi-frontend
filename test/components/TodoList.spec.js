import Vue from "vue"
import HelloWorld from "@/components/HelloWorld"

describe("TodoList.vue", () => {
  let vm = new Vue(HelloWorld).$mount()

  it("renders correct contents", () => {
    const actual = vm.$el.querySelector(".hello h2").textContent
    expect(actual).toBe("Essential Links")
  })
})

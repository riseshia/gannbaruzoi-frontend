import Hello from 'src/components/Hello'
import { expect } from 'chai'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const vm = new Hello().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})

import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import TaskList from '@/components/TaskList'
import store from '@/store'

Vue.config.productionTip = false

describe('TaskList.vue', () => {
  let wrapper
  beforeEach(() => {
    store.dispatch = () => {}
    wrapper = shallowMount(TaskList, { store })
    store.dispatch = jest.fn()
  })
  it('renders correct contents', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('getTasks', () => {
    wrapper.vm.getTasks({ first: 20 })
    expect(store.dispatch.mock.calls).toEqual([['tasks', { first: 20 }]])
  })
  it('createTask', () => {
    wrapper.vm.description = 'test it'
    wrapper.vm.createTask()
    expect(store.dispatch.mock.calls).toEqual([
      [
        'createTask',
        {
          description: 'test it',
          estimatedSize: 5,
        },
      ],
    ])
  })
})

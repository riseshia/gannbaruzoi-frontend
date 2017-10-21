import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'vue-test-utils'
import TaskList from '@/components/TaskList'
import storeConfig from '@/store/index'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store(storeConfig)

describe('TaskList.vue', () => {
  const wrapper = shallow(TaskList, { store })
  beforeEach(() => {
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
    wrapper.vm.createTask()
    expect(store.dispatch.mock.calls).toEqual([['createTask']])
  })
  it('updateNewTaskDescription', () => {
    wrapper.vm.updateNewTaskDescription({ target: { value: '1' } })
    expect(store.dispatch.mock.calls).toEqual([
      ['updateNewTaskDescription', '1']
    ])
  })
})

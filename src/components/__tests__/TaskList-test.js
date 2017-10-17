import Vue from 'vue'
import Vuex from 'vuex'
import TaskList from '@/components/TaskList'
import storeConfig from '@/store/index'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store(storeConfig)
const getComponent = (component) => new Vue({ store, ...TaskList })

describe('TaskList.vue', () => {
  const vm = getComponent(TaskList).$mount()
  it('renders correct contents', () => {
    const actual = vm.$el.querySelector('.task-list h2').textContent
    expect(actual).toBe('Task List')
  })
})

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
  it('renders correct contents', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})

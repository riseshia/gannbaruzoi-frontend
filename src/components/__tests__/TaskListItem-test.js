import { shallow } from 'vue-test-utils'
import TaskListItem from '@/components/TaskListItem'

describe('TaskListItem.vue', () => {
  const props = {
    taskId: 1,
    description: '今日も一日かんばるぞい',
    estimatedSize: 5,
    loggedSize: 0,
    status: false
  }
  const wrapper = shallow(TaskListItem, { props })
  it('renders correct contents', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})

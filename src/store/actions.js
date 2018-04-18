import { query } from '@/api/index'
import Tasks from '@/api/Tasks.graphql'
import CreateTask from '@/api/CreateTask.graphql'

export default {
  updateNewTaskDescription({ commit }, description) {
    commit('UPDATE_NEW_TASK', { description })
  },

  async tasks({ state, commit }, variables) {
    if (state.loading) {
      return
    }
    commit('START_LOADING')
    const payload = await query(Tasks, variables)
    commit('UPDATE_TASKS', payload)
    commit('FINISH_LOADING')
  },

  async createTask({ state, commit }) {
    if (state.loading) {
      return
    }
    commit('START_LOADING')
    commit('MAKE_MUTATION_ID_TASK')
    const payload = await query(CreateTask, state.newTask)
    commit('PUSH_TASK', payload)
    commit('UPDATE_NEW_TASK', { description: '' })
    commit('FINISH_LOADING')
  },
}

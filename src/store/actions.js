import uuid from 'uuid/v4'
import { query } from '@/api/index'
import Tasks from '@/api/Tasks.graphql'
import CreateTask from '@/api/CreateTask.graphql'

export default {
  async tasks({ state, commit }, variables) {
    if (state.loading) {
      return
    }
    commit('START_LOADING')
    const payload = await query(Tasks, variables)
    commit('UPDATE_TASKS', payload)
    commit('FINISH_LOADING')
  },

  async createTask({ state, commit }, input) {
    if (state.loading) {
      return
    }
    commit('START_LOADING')
    const payload = await query(CreateTask, {
      input: {
        clientMutationId: uuid(),
        ...input,
      },
    })
    commit('PUSH_TASK', payload)
    commit('FINISH_LOADING')
  },
}

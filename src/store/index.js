import api from '@/api/index'
import * as uuid from 'uuid/v4'

export default {
  strict: true,

  state: {
    loading: false,
    newTask: {
      description: '',
      estimatedSize: 5
    },
    tasks: {
      edges: [],
      pageInfo: {}
    }
  },

  actions: {
    async TASKS ({ state, commit }, variables) {
      if (state.loading) { return }
      commit('START_LOADING')
      const payload = await api.Tasks(variables)
      commit('UPDATE_TASKS', payload)
      commit('FINISH_LOADING')
    },

    async CREATE_TASK ({ state, commit }) {
      if (state.loading) { return }
      commit('START_LOADING')
      commit('MAKE_MUTATION_ID_TASK')
      const payload = await api.CreateTask(state.newTask)
      commit('PUSH_TASK', payload)
      commit('UPDATE_NEW_TASK', { description: '' })
      commit('FINISH_LOADING')
    }
  },

  mutations: {
    UPDATE_TASKS (state, { data }) {
      state.tasks = data.tasks
    },

    UPDATE_NEW_TASK (state, payload) {
      state.newTask = { ...state.newTask, ...payload }
    },

    PUSH_TASK (state, { data }) {
      state.tasks.edges.push({
        // @todo should get node
        cursor: null,
        node: data.createTask.task
      })
    },

    MAKE_MUTATION_ID_TASK (state) {
      state.newTask.clientMutationId = uuid()
    },

    START_LOADING (state) {
      state.loading = true
    },

    FINISH_LOADING (state) {
      state.loading = false
    }
  }
}

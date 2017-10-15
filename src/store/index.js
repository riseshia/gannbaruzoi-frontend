import api from '@/api/index'

export default {
  strict: true,

  state: {
    loading: true,
    tasks: {
      edges: [],
      pageInfo: {}
    }
  },

  actions: {
    async TASKS ({ commit }, variables) {
      commit('START_LOADING')
      const payload = await api.Tasks(variables)
      commit('UPDATE_TASKS', payload)
      commit('FINISH_LOADING')
    }
  },

  mutations: {
    UPDATE_TASKS (state, { data }) {
      state.tasks = data.tasks
    },

    START_LOADING (state) {
      state.loading = true
    },

    FINISH_LOADING (state) {
      state.loading = false
    }
  }
}

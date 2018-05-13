export default {
  UPDATE_TASKS(state, { data }) {
    state.tasks = data.tasks
  },

  PUSH_TASK(state, { data }) {
    state.tasks.edges.push({
      // @todo should get node
      cursor: null,
      node: data.createTask.task,
    })
  },

  START_LOADING(state) {
    state.loading = true
  },

  FINISH_LOADING(state) {
    state.loading = false
  },
}

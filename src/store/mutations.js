import uuid from 'uuid/v4';

export default {
  UPDATE_TASKS(state, { data }) {
    state.tasks = data.tasks;
  },

  UPDATE_NEW_TASK(state, payload) {
    state.newTask = { ...state.newTask, ...payload };
  },

  PUSH_TASK(state, { data }) {
    state.tasks.edges.push({
      // @todo should get node
      cursor: null,
      node: data.createTask.task
    });
  },

  MAKE_MUTATION_ID_TASK(state) {
    state.newTask.clientMutationId = uuid();
  },

  START_LOADING(state) {
    state.loading = true;
  },

  FINISH_LOADING(state) {
    state.loading = false;
  }
};

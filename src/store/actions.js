import { tasks, createTask } from '@/api/index';

export default {
  updateNewTaskDescription({ commit }, description) {
    commit('UPDATE_NEW_TASK', { description });
  },

  async tasks({ state, commit }, variables) {
    if (state.loading) {
      return;
    }
    commit('START_LOADING');
    const payload = await tasks(variables);
    commit('UPDATE_TASKS', payload);
    commit('FINISH_LOADING');
  },

  async createTask({ state, commit }) {
    if (state.loading) {
      return;
    }
    commit('START_LOADING');
    commit('MAKE_MUTATION_ID_TASK');
    const payload = await createTask(state.newTask);
    commit('PUSH_TASK', payload);
    commit('UPDATE_NEW_TASK', { description: '' });
    commit('FINISH_LOADING');
  }
};

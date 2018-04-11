import mutations from '@/store/mutations';

describe('mutations', () => {
  const state = {
    loading: true,
    newTask: {
      description: '',
      estimatedSize: 5
    },
    tasks: {
      edges: [],
      pageInfo: {}
    }
  };

  it('UPDATE_TASKS', () => {
    mutations.UPDATE_TASKS(state, {
      data: { tasks: { edges: [1, 2, 3] } }
    });
    expect(state.tasks.edges).toEqual([1, 2, 3]);
  });

  it('UPDATE_NEW_TASK', () => {
    mutations.UPDATE_NEW_TASK(state, {
      description: 'abc'
    });
    expect(state.newTask.description).toEqual('abc');
    mutations.UPDATE_NEW_TASK(state, {
      description: ''
    });
    expect(state.newTask.description).toEqual('');
  });

  it('PUSH_TASK', () => {
    const payload = {
      data: {
        createTask: {
          task: {
            type: 'ROOT',
            status: false,
            parentId: null,
            id: '3',
            estimatedSize: 5,
            description: 'make cookie'
          }
        }
      }
    };
    const before = state.tasks.edges.length;
    mutations.PUSH_TASK(state, payload);
    const after = state.tasks.edges.length;
    expect(after - before).toBe(1);
  });

  it('MAKE_MUTATION_ID_TASK', () => {
    mutations.MAKE_MUTATION_ID_TASK(state);
    expect(state.newTask.clientMutationId).not.toBe(null);
  });

  it('START_LOADING', () => {
    mutations.START_LOADING(state);
    expect(state.loading).toBe(true);
  });

  it('FINISH_LOADING', () => {
    mutations.FINISH_LOADING(state);
    expect(state.loading).toBe(false);
  });
});

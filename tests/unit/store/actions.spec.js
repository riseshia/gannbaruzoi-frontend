import actions from '@/store/actions';
import * as api from '@/api';

describe('actions', () => {
  describe('tasks', () => {
    it('skips when loading', async () => {
      const commit = jest.fn();
      const state = { loading: true };

      actions.tasks({ commit, state }, { first: 5 });
      expect(commit.mock.calls).toEqual([]);
    });

    it('commit mutations', async () => {
      const commit = jest.fn();
      const state = {};
      const payload = {
        data: {
          tasks: {
            pageInfo: {
              hasNextPage: false
            },
            edges: [
              {
                node: {
                  type: 'ROOT',
                  logs: [],
                  id: '1',
                  estimatedSize: 5,
                  description: 'make cookie'
                },
                cursor: 'YXJyYXljb25uZWN0aW9uOjA='
              }
            ]
          }
        }
      };
      api.tasks = jest.fn(() => Promise.resolve(payload));
      await actions.tasks({ commit, state }, { first: 5 });
      expect(commit.mock.calls).toEqual([
        ['START_LOADING'],
        ['UPDATE_TASKS', payload],
        ['FINISH_LOADING']
      ]);
      expect(api.tasks.mock.calls).toEqual([[{ first: 5 }]]);
    });
  });

  describe('createTask', () => {
    it('skips when loading', async () => {
      const commit = jest.fn();
      const state = {
        loading: true,
        newTask: {
          clientMutationId: 'some-random-string',
          description: 'make cookie',
          estimatedSize: 5,
          parentId: null
        }
      };
      await actions.createTask({ state, commit });
      expect(commit.mock.calls).toEqual([]);
    });
    it('commit mutations', async () => {
      const commit = jest.fn();
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
      api.createTask = jest.fn(() => Promise.resolve(payload));
      const state = {
        newTask: {
          clientMutationId: 'some-random-string',
          description: 'make cookie',
          estimatedSize: 5,
          parentId: null
        }
      };

      await actions.createTask({ commit, state });
      expect(api.tasks.mock.calls).toEqual([[{ first: 5 }]]);
      expect(commit.mock.calls).toEqual([
        ['START_LOADING'],
        ['MAKE_MUTATION_ID_TASK'],
        ['PUSH_TASK', payload],
        ['UPDATE_NEW_TASK', { description: '' }],
        ['FINISH_LOADING']
      ]);
      expect(api.createTask.mock.calls).toEqual([[state.newTask]]);
    });
  });
  it('updateNewTaskDescription', async () => {
    const commit = jest.fn();
    const state = {
      newTask: {
        clientMutationId: 'some-random-string',
        description: 'make cookie',
        estimatedSize: 5,
        parentId: null
      }
    };
    await actions.updateNewTaskDescription({ commit, state }, 'abc');
    expect(commit.mock.calls).toEqual([
      ['UPDATE_NEW_TASK', { description: 'abc' }]
    ]);
  });
});
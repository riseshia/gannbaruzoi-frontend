import store from '@/store/index'
import * as api from '@/api/index'

describe('store', () => {
  describe('actions', () => {
    describe('TASKS', () => {
      it('skips when loading', async () => {
        const commit = jest.fn()
        const state = { loading: true }

        store.actions.TASKS({ commit, state }, { first: 5 })
        expect(commit.mock.calls).toEqual([])
      })

      it('commit mutations', async () => {
        const commit = jest.fn()
        const state = {}
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
        }
        api.tasks = jest.fn(() => Promise.resolve(payload))
        await store.actions.TASKS({ commit, state }, { first: 5 })
        expect(commit.mock.calls).toEqual([
          ['START_LOADING'],
          ['UPDATE_TASKS', payload],
          ['FINISH_LOADING']
        ])
        expect(api.tasks.mock.calls).toEqual([[{ first: 5 }]])
      })
    })

    describe('CREATE_TASK', () => {
      it('skips when loading', async () => {
        const commit = jest.fn()
        const state = {
          loading: true,
          newTask: {
            clientMutationId: 'some-random-string',
            description: 'make cookie',
            estimatedSize: 5,
            parentId: null
          }
        }
        await store.actions.CREATE_TASK({ state, commit })
        expect(commit.mock.calls).toEqual([])
      })
      it('commit mutations', async () => {
        const commit = jest.fn()
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
        }
        api.createTask = jest.fn(() => Promise.resolve(payload))
        const state = {
          newTask: {
            clientMutationId: 'some-random-string',
            description: 'make cookie',
            estimatedSize: 5,
            parentId: null
          }
        }

        await store.actions.CREATE_TASK({ commit, state })
        expect(api.tasks.mock.calls).toEqual([[{ first: 5 }]])
        expect(commit.mock.calls).toEqual([
          ['START_LOADING'],
          ['MAKE_MUTATION_ID_TASK'],
          ['PUSH_TASK', payload],
          ['UPDATE_NEW_TASK', { description: '' }],
          ['FINISH_LOADING']
        ])
        expect(api.createTask.mock.calls).toEqual([[state.newTask]])
      })
    })
    it('UPDATE_NEW_TASK_DESCRIPTION', async () => {
      const commit = jest.fn()
      const state = {
        newTask: {
          clientMutationId: 'some-random-string',
          description: 'make cookie',
          estimatedSize: 5,
          parentId: null
        }
      }
      await store.actions.UPDATE_NEW_TASK_DESCRIPTION({ commit, state }, 'abc')
      expect(commit.mock.calls).toEqual([
        ['UPDATE_NEW_TASK', { description: 'abc' }]
      ])
    })
  })

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
    }

    it('UPDATE_TASKS', () => {
      store.mutations.UPDATE_TASKS(state, {
        data: { tasks: { edges: [1, 2, 3] } }
      })
      expect(state.tasks.edges).toEqual([1, 2, 3])
    })

    it('UPDATE_NEW_TASK', () => {
      store.mutations.UPDATE_NEW_TASK(state, {
        description: 'abc'
      })
      expect(state.newTask.description).toEqual('abc')
      store.mutations.UPDATE_NEW_TASK(state, {
        description: ''
      })
      expect(state.newTask.description).toEqual('')
    })

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
      }
      const before = state.tasks.edges.length
      store.mutations.PUSH_TASK(state, payload)
      const after = state.tasks.edges.length
      expect(after - before).toBe(1)
    })

    it('MAKE_MUTATION_ID_TASK', () => {
      store.mutations.MAKE_MUTATION_ID_TASK(state)
      expect(state.newTask.clientMutationId).not.toBe(null)
    })

    it('START_LOADING', () => {
      store.mutations.START_LOADING(state)
      expect(state.loading).toBe(true)
    })

    it('FINISH_LOADING', () => {
      store.mutations.FINISH_LOADING(state)
      expect(state.loading).toBe(false)
    })
  })
})

import actions from '@/store/actions'
import * as api from '@/api'
import Tasks from '@/api/Tasks.graphql'
import CreateTask from '@/api/CreateTask.graphql'

describe('actions', () => {
  describe('tasks', () => {
    it('skips when loading', () => {
      const commit = jest.fn()
      const state = { loading: true }

      actions.tasks({ commit, state }, { first: 5 })
      expect(commit.mock.calls).toEqual([])
    })

    it('commit mutations', async () => {
      const commit = jest.fn()
      const state = {}
      const payload = {
        data: {
          tasks: {
            pageInfo: {
              hasNextPage: false,
            },
            edges: [
              {
                node: {
                  type: 'ROOT',
                  logs: [],
                  id: '1',
                  estimatedSize: 5,
                  description: 'make cookie',
                },
                cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
              },
            ],
          },
        },
      }
      api.query = jest.fn(() => Promise.resolve(payload))
      await actions.tasks({ commit, state }, { first: 5 })
      expect(commit.mock.calls).toEqual([
        ['START_LOADING'],
        ['UPDATE_TASKS', payload],
        ['FINISH_LOADING'],
      ])
      expect(api.query.mock.calls).toEqual([[Tasks, { first: 5 }]])
    })
  })

  describe('createTask', () => {
    it('skips when loading', async () => {
      const commit = jest.fn()
      const state = {
        loading: true,
        newTask: {
          clientMutationId: 'some-random-string',
          description: 'make cookie',
          estimatedSize: 5,
          parentId: null,
        },
      }
      await actions.createTask({ state, commit })
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
              description: 'make cookie',
            },
          },
        },
      }
      api.query = jest.fn(() => Promise.resolve(payload))
      const state = {
        newTask: {
          clientMutationId: 'some-random-string',
          description: 'make cookie',
          estimatedSize: 5,
          parentId: null,
        },
      }

      await actions.createTask({ commit, state })
      expect(api.query.mock.calls).toEqual([
        [CreateTask, state.newTask]
      ])
      expect(commit.mock.calls).toEqual([
        ['START_LOADING'],
        ['MAKE_MUTATION_ID_TASK'],
        ['PUSH_TASK', payload],
        ['UPDATE_NEW_TASK', { description: '' }],
        ['FINISH_LOADING'],
      ])
    })
  })
  it('updateNewTaskDescription', async () => {
    const commit = jest.fn()
    const state = {
      newTask: {
        clientMutationId: 'some-random-string',
        description: 'make cookie',
        estimatedSize: 5,
        parentId: null,
      },
    }
    await actions.updateNewTaskDescription({ commit, state }, 'abc')
    expect(commit.mock.calls).toEqual([
      ['UPDATE_NEW_TASK', { description: 'abc' }],
    ])
  })
})

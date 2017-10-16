import store from '@/store/index'
import fetch from 'fetch-vcr'
fetch.configure({
  fixturePath: `${__dirname}/../_fixtures`,
  mode: 'cache'
})

const testAction = async (action, payload, state, expectedMutations) => {
  let count = 0

  // mock commit
  const commit = (type, cPayload) => {
    const mutation = expectedMutations[count]

    expect(mutation.type).toEqual(type)
    if (cPayload) {
      expect(mutation.payload).toEqual(cPayload)
    }

    count += 1
    if (count >= expectedMutations.length) {
      return;
    }
  }

  // call the action with mocked store and arguments
  await action({ commit, state }, payload)

  // check should have same count
  expect(count).toBe(expectedMutations.length);

  // check if no mutations should have been dispatched
  if (expectedMutations.length === 0) {
    expect(count).toEqual(0)
  }
}

describe("store", () => {
  describe("actions", () => {
    it("TASKS", async () => {
      await testAction(store.actions.TASKS, { first: 5 }, {}, [
        { type: 'START_LOADING' },
        { type: 'UPDATE_TASKS', payload: {
          data: {
            tasks: {
              pageInfo: {
                hasNextPage:false
              },
              edges: [{
                node: {
                  type: "ROOT",
                  logs: [],
                  id: "1",
                  description: "make cookie"
                },
                cursor: "YXJyYXljb25uZWN0aW9uOjA="
              }]
            }
          }
        } },
        { type: 'FINISH_LOADING' }
      ])
    })

    it("CREATE_TASK", async () => {
      const state = {
        newTask: {
          clientMutationId: "some-random-string",
          description: "make cookie",
          estimatedSize: 5,
          parentId: null
        }
      }

      await testAction(store.actions.CREATE_TASK, null, state, [
        { type: 'START_LOADING' },
        { type: 'MAKE_MUTATION_ID_TASK' },
        { type: 'PUSH_TASK', payload: {
          data: {
            createTask: {
              task: {
                type: "ROOT",
                status: false,
                parentId: null,
                id: "3",
                estimatedSize: 5,
                description: "make cookie"
              }
            }
          }
        } },
        { type: 'UPDATE_NEW_TASK', payload: { description: '' } },
        { type: 'FINISH_LOADING' }
      ])
    })
  })

  describe("mutations", () => {
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

    it("UPDATE_TASKS", () => {
      store.mutations.UPDATE_TASKS(state, {
        data: { tasks: { edges: [1, 2, 3] } }
      })
      expect(state.tasks.edges).toEqual([1, 2, 3])
    })

    it("UPDATE_NEW_TASK", () => {
      store.mutations.UPDATE_NEW_TASK(state, {
        description: 'abc'
      })
      expect(state.newTask.description).toEqual('abc')
      store.mutations.UPDATE_NEW_TASK(state, {
        description: ''
      })
      expect(state.newTask.description).toEqual('')
    })

    it("PUSH_TASK", () => {
      const payload = {
        data: {
          createTask: {
            task: {
              type: "ROOT",
              status: false,
              parentId: null,
              id: "3",
              estimatedSize: 5,
              description: "make cookie"
            }
          }
        }
      }
      const before = state.tasks.edges.length
      store.mutations.PUSH_TASK(state, payload)
      const after = state.tasks.edges.length
      expect(after - before).toBe(1)
    })

    it("MAKE_MUTATION_ID_TASK", () => {
      store.mutations.MAKE_MUTATION_ID_TASK(state)
      expect(state.newTask.clientMutationId).not.toBe(null)
    })

    it("START_LOADING", () => {
      store.mutations.START_LOADING(state)
      expect(state.loading).toBe(true)
    })

    it("FINISH_LOADING", () => {
      store.mutations.FINISH_LOADING(state)
      expect(state.loading).toBe(false)
    })
  })
})

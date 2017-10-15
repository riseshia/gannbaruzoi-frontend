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
          "data": {
            "tasks": {
              "edges": [{
                "cursor": "YXJyYXljb25uZWN0aW9uOjA=",
                  "node": {
                    "description": "make cookie",
                      "id": "1",
                      "logs": [],
                      "type": "ROOT"
                  },
              }],
              "pageInfo": {
                "hasNextPage": false,
              }
            }
          }
        } },
        { type: 'FINISH_LOADING' }
      ])
    })
  })

  describe("mutations", () => {
    const state = {
      loading: true,
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

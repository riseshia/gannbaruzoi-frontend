import api from '@/api/index'
import fetch from 'fetch-vcr'
fetch.configure({
  fixturePath: `${__dirname}/../_fixtures`,
  mode: 'cache'
})

describe("api", () => {
  describe("Tasks", () => {
    it("returns json", async () => {
      const payload = await api.Tasks({first: 5})
        const expected = {
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
        }
      expect(payload).toEqual(expected)
    })
  })
  describe("CreateTask", () => {
    it("returns json", async () => {
      const payload = await api.CreateTask({
        clientMutationId: "some-random-string",
        description: "make cookie",
        estimatedSize: 5,
        parentId: null,
      })
      const expected = {
        data: {
          createTask: {
            task: {
              type: "ROOT",
              status: false,
              parent_id: null,
              id: "2",
              estimated_size: 5,
              description: "make cookie"
            }
          }
        }
      }
      expect(payload).toEqual(expected)
    })
  })
})

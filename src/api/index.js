import Tasks from './Tasks.graphql'
import CreateTask from './CreateTask.graphql'
import fetch from 'isomophic-fetch'

async function query(graphqlQuery, variables) {
  const response = await fetch("http://localhost:4000/api", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: graphqlQuery.loc.source.body,
      variables,
    })
  })
  const json = await response.json()
  return json
}

export default {
  async Tasks(variables) {
    return query(Tasks, variables)
  },
  async CreateTask(variables) {
    return query(CreateTask, variables)
  },
}

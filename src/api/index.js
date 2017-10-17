import Tasks from './Tasks.graphql'
import CreateTask from './CreateTask.graphql'
import fetch from 'isomorphic-fetch'

async function query (graphqlQuery, variables) {
  const response = await fetch('http://localhost:4000/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: graphqlQuery.loc.source.body,
      variables
    })
  })
  const json = await response.json()
  return json
}

export async function tasks (variables) {
  return query(Tasks, variables)
}

export async function createTask (variables) {
  return query(CreateTask, variables)
}

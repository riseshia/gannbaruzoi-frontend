import fetch from 'isomorphic-fetch'

export async function query(graphqlQuery, variables) {
  const response = await fetch('http://localhost:4000/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: graphqlQuery.loc.source.body,
      variables,
    }),
  })
  const json = await response.json()
  return json
}
export async function mutate(graphqlQuery, variables) {
  const response = await fetch('http://localhost:4000/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: graphqlQuery.loc.source.body,
      variables,
    }),
  })
  const json = await response.json()
  return json
}

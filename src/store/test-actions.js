export const testAction = async (action, payload, state, expectedMutations) => {
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

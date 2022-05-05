
import sleep from '~/modules/helpers/sleep.js'

function model (data, error, loading, success) {
  return Object.freeze({ data, error, loading, success })
}

export const init = model(null, null, null, null)
const loading = model(null, null, true, null)

function setLoading (state, data) {
  state[data.key] = loading
}

function setResponse (state, data) {
  const error = data.value.error

  state[data.key] = error
    ? model(null, error.messages, null, false)
    : model(data.value, null, null, true)
}

export function mockRequest (scope, data) {
  const key = data.key

  return async function (dispatch) {
    dispatch(scope + '/setLoading', { key })

    await sleep(data.delay)

    dispatch(scope + '/setResponse', {
      key,
      value: data.payload
    })
  }
}

export function request (scope, data) {
  const key = data.key

  return async function (dispatch) {
    dispatch(scope + '/setLoading', { key })

    try {
      const res = await fetch(data.url, data.options)

      dispatch(scope + '/setResponse', {
        key,
        value: await res[data.type ?? 'json']()
      })
    } catch (error) {
      console.warn('Request error >>', error)

      dispatch(scope + '/setResponse', {
        key,
        value: error
      })
    }
  }
}

async function authRequest () {
  //
}

export function requestStore (options) {
  const state = options.state
  const actions = options.actions

  options.init.forEach(function (key) {
    state[key] = init
  })

  actions.setLoading = setLoading
  actions.setResponse = setResponse

  return { state, actions }
}

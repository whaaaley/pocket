
import { clone } from './lib.js'

const FF_DEV = process.env.NODE_ENV === 'development'

export function reactive (state, schedule) {
  const data = {}
  const props = {}

  for (const key in state) {
    data[key] = state[key]

    props[key] = {
      get () {
        return data[key]
      },
      set (value) {
        schedule(key, value, data[key])
        data[key] = value
      }
    }
  }

  return Object.defineProperties(state, props)
}

export function core (init, patch, watch) {
  let lock = true
  const render = init.setup(reactive(init.state, schedule))

  update()

  function update () {
    patch(render())
    lock = false
  }

  function schedule (key, value, oldValue) {
    const func = watch && watch[key]

    if (func) {
      func(value, oldValue)
    }

    if (!lock) {
      lock = true
      requestAnimationFrame(update)
    }
  }
}

export default function pocket (init, patch) {
  const state = {}
  const actions = {}
  const watch = {}
  const map = {}

  const stores = init.stores

  for (const scope in stores) {
    const store = stores[scope]

    state[scope] = store.state
    const storeActions = store.actions
    watch[scope] = store.watch

    for (const key in storeActions) {
      const name = scope + '.' + key

      actions[name] = storeActions[key]
      map[name] = scope
    }
  }

  core({ state, setup }, patch, watch)

  function setup (state) {
    function dispatch (name, data) {
      if (FF_DEV) {
        console.log('Dispatch >>', name)
      }

      const action = actions[name]
      const scope = map[name]

      if (FF_DEV && typeof action !== 'function') {
        console.warn('Dispatch >> Invalid action >>', name)
      }

      const result = action(clone(state[scope]), data)

      if (typeof result === 'function') {
        if (FF_DEV && typeof result !== 'function') {
          console.warn('Dispatch >> Invalid effect >>', name)
        }

        const effect = result(dispatch)

        if (effect && effect.then) {
          return effect.then()
        }
      } else {
        state[scope] = result
      }
    }

    return init.setup(state, dispatch)
  }
}

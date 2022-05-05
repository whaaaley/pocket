
const FF_DEV = process.env.NODE_ENV === 'development'
const FF_QUIET = process.env.FF_QUIET != null

export function core (init, render) {
  const state = init.state

  let lock = true
  const view = init.setup(state, commit)

  update()

  function update () {
    render(view())
    lock = false
  }

  function schedule () {
    if (!lock) {
      lock = true
      requestAnimationFrame(update)
    }
  }

  function commit (action, data, options) {
    if (FF_QUIET) {
      const name = action && action.name
      console.log('Commit >>', name ?? '(anon)')
    }

    const scope = options && options.scope
    const result = action(scope ? state[scope] : state, data)

    if (result) {
      if (FF_DEV && typeof result !== 'function') {
        console.warn('Commit >> Invalid return type >>', action)
      }

      const caller = options && options.caller
      const effect = result(caller ?? commit)

      if (effect && effect.then) {
        return effect.then(schedule)
      }
    } else {
      schedule()
    }
  }
}

export default function (init, render) {
  const stores = init.stores

  const state = {}
  const actions = {}
  const map = {}

  for (const scope in stores) {
    const store = stores[scope]

    state[scope] = store.state
    const storeActions = store.actions

    for (const key in storeActions) {
      const name = scope + '/' + key

      actions[name] = storeActions[key]
      map[name] = scope
    }
  }

  function setup (state, commit) {
    function dispatch (name, data) {
      if (FF_QUIET) {
        console.log('Dispatch >>', name)
      }

      if (FF_DEV && typeof actions[name] !== 'function') {
        console.warn('Dispatch >> Invalid action >>', name)
      }

      return commit(actions[name], data, {
        scope: map[name],
        caller: dispatch
      })
    }

    return init.setup(state, dispatch)
  }

  return core({ state, setup }, render)
}

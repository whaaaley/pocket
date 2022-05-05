
import { decode, encode } from './lib'

const pushstate = new CustomEvent('pocket-pushstate')

function sync (state, rewrites) {
  const search = location.search
  const pathname = location.pathname

  state.query = search[0] === '?' ? decode(search) : null

  if (rewrites != null) {
    for (let i = 0; i < rewrites.length; i++) {
      const rewrite = rewrites[i]
      const source = rewrite.source

      if (typeof source === 'function') {
        const result = rewrite.source()

        if (result === false || result == null) {
          continue
        }

        state.id = result
        state.to = rewrite.destination

        return
      }

      const result = pathname.match(rewrite.source)

      if (result !== null) {
        state.id = result[0]
        state.to = rewrite.destination

        return
      }
    }
  }

  state.id = null
  state.to = pathname
}

export function link (to, query) {
  to = to == null ? location.pathname : to
  query = query == null ? to : to + encode(query)

  const state = history.state ?? {}

  if (state.to === to && state.query === query) {
    return
  }

  history.pushState({ to, query }, null, query)
  dispatchEvent(pushstate)
}

export function router (init, app) {
  const pages = init.pages

  init.stores.router = {
    state: {
      id: null,
      query: null,
      to: '/'
    },
    actions: {
      sync
    }
  }

  app({
    stores: init.stores,
    setup (state, dispatch) {
      let destroy = null
      let view = null

      function main () {
        dispatch('router/sync', init.rewrites)

        if (destroy != null) {
          destroy(state, dispatch)
        }

        let route = pages[state.router.to]
        route = route == null ? pages['/missing'] : route

        const setup = route.setup
        view = setup != null && setup(state, dispatch)

        destroy = route.destroy
      }

      main()

      addEventListener('pocket-pushstate', main)
      addEventListener('popstate', main)

      return function () {
        return view()
      }
    }
  })
}


import { decode, encode } from './lib.js'

const pushstate = new CustomEvent('pocket-pushstate')

export function link (to, query) {
  to = to == null ? location.pathname : to
  query = query == null ? to : to + encode(query)

  const state = history.state || {}

  if (state.to === to && state.query === query) {
    return // early exit
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
      sync: (state, rewrites) => {
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

              return state
            }

            const result = pathname.match(rewrite.source)

            if (result !== null) {
              state.id = result[0]
              state.to = rewrite.destination

              return state
            }
          }
        }

        state.id = null
        state.to = pathname

        return state
      }
    },
    watch: (value, oldValue) => {
      console.log('route >>', value, oldValue)
    }
  }

  app({
    stores: init.stores,
    setup: (state, dispatch) => {
      let render = null
      let destroy = null

      main()

      addEventListener('pocket-pushstate', main)
      addEventListener('popstate', main)

      function main () {
        dispatch('router.sync', init.rewrites)

        if (destroy != null) {
          destroy(state, dispatch)
        }

        let route = pages[state.router.to]
        route = route == null ? pages['/missing'] : route

        const setup = route.setup

        if (setup != null) {
          render = setup(state, dispatch)
        }

        destroy = route.destroy
      }

      return () => {
        return render()
      }
    }
  })
}


import { core } from './pocket'

const nodeMap = new WeakMap()
const shadowInit = { mode: 'open' }

export function ShadowRoot ({ host, patch }, view) {
  let node

  Object.defineProperty(host, 'node', {
    get () {
      return node
    },
    set (value) {
      let root = nodeMap.get(node = value)

      if (!root) {
        nodeMap.set(node, root = document.createElement('div'))
        node.attachShadow(shadowInit).appendChild(root)
      }

      patch(root, view)
    }
  })

  return host
}

export function IFrameRoot ({ host, patch }, view) {
  let node

  Object.defineProperty(host, 'node', {
    get () {
      return node
    },
    set (value) {
      let root = nodeMap.get(node = value)

      requestAnimationFrame(function () {
        if (!root) {
          nodeMap.set(node, root = document.createElement('div'))
          node.contentDocument.documentElement.replaceWith(root)
        }

        patch(root, view)
      })
    }
  })

  return host
}

export function Component ({ host, init, props, patch }, view) {
  console.warn('Warning: Component is deprecated. Use defineComponent instead.')

  let node

  Object.defineProperty(host, 'node', {
    get () {
      return node
    },
    set (value) {
      const data = nodeMap.get(node = value) ?? {}
      let root = data.root

      data.props = props
      data.view = view

      if (root) {
        patch(root, data.render())
      } else {
        // cache original setup function
        const setup = init.setup

        init.setup = function (state) {
          const render = setup(state)

          // eslint-disable-next-line no-return-assign
          return data.render = function () {
            return render(data.props, data.view)
          }
        }

        root = node.attachShadow(shadowInit)
        root = root.appendChild(data.root = document.createElement('div'))

        core(init, function (view) {
          return patch(root, view)
        })
      }

      nodeMap.set(node, data)
    }
  })

  return host
}

export function defineComponent ({ host, patch, props, children }, setup2) {
  let node

  function get () {
    return node
  }

  function set (value) {
    const cache = nodeMap.get(node = value) ?? {}

    cache.props = props
    cache.children = children

    if (cache.root) {
      patch(cache.root, cache.render(props, children))
      return // early exit
    }

    const render = setup2(function useState (state2) {
      // eslint-disable-next-line no-return-assign
      return cache.state = state2
    }, node)

    function setup () {
      // eslint-disable-next-line no-return-assign
      return cache.render = function () {
        return render(cache.props, cache.children)
      }
    }

    const root = node
      .attachShadow(shadowInit)
      .appendChild(cache.root = document.createElement('div'))

    core({ state: cache.state, setup }, function (view) {
      return patch(root, view)
    })

    nodeMap.set(node, cache)
  }

  return Object.defineProperty(host, 'node', { get, set })
}

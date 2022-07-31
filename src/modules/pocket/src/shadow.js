/* eslint-disable no-return-assign */

import { core } from './pocket'

const nodeMap = new WeakMap()
const shadowInit = { mode: 'open' }

export function defineShadowRoot ({ host, patch }, view) {
  let node

  return Object.defineProperty(host, 'node', {
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
}

export function defineInlineFrame ({ host, patch }, view) {
  let node

  return Object.defineProperty(host, 'node', {
    get () {
      return node
    },
    set (value) {
      let root = nodeMap.get(node = value)

      requestAnimationFrame(function callback () {
        if (!root) {
          nodeMap.set(node, root = document.createElement('iframe'))
          node.contentDocument.documentElement.replaceWith(root)
        }

        patch(root, view)
      })
    }
  })
}

export function defineComponent ({ props, host, patch }, setup) {
  let node

  return Object.defineProperty(host, 'node', {
    get () {
      return node
    },
    set (value) {
      const cache = nodeMap.get(node = value) ?? {}

      let shouldComponentUpdate = false

      for (const key in props) {
        if (cache[key] !== props[key]) {
          shouldComponentUpdate = true
        }
      }

      cache.props = props

      if (cache.root) {
        if (shouldComponentUpdate) {
          patch(cache.root, cache.render())
        }

        return // early exit
      }

      const root = value
        .attachShadow(shadowInit)
        .appendChild(cache.root = document.createElement('div'))

      const render = setup({
        host: value,
        node: root,
        useState (state) {
          return cache.state = state
        }
      })

      core({
        state: cache.state,
        setup () {
          return cache.render = () => render(cache.props)
        }
      }, view => patch(root, view))

      nodeMap.set(value, cache)
    }
  })
}

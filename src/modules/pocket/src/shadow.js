/* eslint-disable no-return-assign */

import { core } from './pocket.js'

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

      requestAnimationFrame(() => {
        if (!root) {
          nodeMap.set(node, root = document.createElement('iframe'))
          node.contentDocument.documentElement.replaceWith(root)
        }

        patch(root, view)
      })
    }
  })
}

export function defineComponent ({ props, host, patch, isolate }, setup) {
  let node

  return Object.defineProperty(host, 'node', {
    get () {
      return node
    },
    set (value) {
      const cache = nodeMap.get(node = value) ?? {}
      let shouldUpdate = false

      for (const key in props) {
        if (cache[key] !== props[key]) {
          shouldUpdate = true
        }
      }

      cache.props = props

      if (cache.root) {
        if (shouldUpdate && !isolate) {
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
        reactive: state => cache.state = state,
        watch: watch => cache.watch = watch
      })

      core({
        state: cache.state,
        setup: () => cache.render = () => render(cache.props)
      }, view => patch(root, view), cache.watch)

      nodeMap.set(value, cache)
    }
  })
}

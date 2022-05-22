
import { core } from './pocket'

const nodeMap = new WeakMap()
const shadowInit = { mode: 'open' }

export function Component ({ host, init, props, patch }, view) {
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

        init.setup = function (state, dispatch) {
          const render = setup(state, dispatch)

          // eslint-disable-next-line no-return-assign
          return data.render = function () {
            return render(data.props, data.view)
          }
        }

        root = node.attachShadow(shadowInit)
        root = root.appendChild(data.root = document.createElement('div'))

        // should i unwrap this callback?
        core(init, function (view) {
          return patch(root, view)
        })
      }

      nodeMap.set(node, data)
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

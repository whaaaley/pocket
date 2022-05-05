
import { core } from './pocket'

const nodeMap = new WeakMap()
const shadowInit = { mode: 'open' }

export function Component (props, view) {
  const host = props.host
  const patch = props.patch

  let node

  Object.defineProperty(host, 'node', {
    get () {
      return node
    },
    set (value) {
      const data = nodeMap.get(node = value) ?? {}
      let root = data.root

      data.props = props.props
      data.view = view

      if (root) {
        patch(root, data.render())
      } else {
        const init = props.init
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

        core(init, function (view) {
          return patch(root, view)
        })
      }

      nodeMap.set(node, data)
    }
  })

  return host
}

export function IFrameRoot (props, view) {
  const host = props.host
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

        props.patch(root, view)
      })
    }
  })

  return host
}

export function ShadowRoot (props, view) {
  const host = props.host
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

      props.patch(root, view)
    }
  })

  return host
}

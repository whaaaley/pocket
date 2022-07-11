
import { h, text, patch } from 'superfine'
import { ShadowRoot, IFrameRoot, Component, defineComponent } from '~/modules/pocket/'

function ShadowRoot2 ({ id, styles, slots }, children) {
  const key = id + '-host'
  const host = h('div', { key, id: key }, [])

  if (styles) {
    for (const key in styles) {
      const styleKey = id + '-style-' + children.length

      children.push(
        h('style', { key: styleKey }, text(styles[key]))
      )
    }
  }

  if (slots) {
    for (const key in slots) {
      const slotKey = id + '-slot-' + host.children.length

      host.children.push(
        h('slot', { slot: key, key: slotKey }, slots[key])
      )
    }
  }

  return ShadowRoot({ host, patch }, h('div', { id }, children))
}

function IFrameRoot2 ({ id, styles }, children) {
  const key = id + '-host'
  const host = h('iframe', { key, id: key })

  if (styles) {
    for (const key in styles) {
      const styleKey = id + '-style-' + children.length

      children.push(
        h('style', { key: styleKey }, text(styles[key]))
      )
    }
  }

  return IFrameRoot({ host, patch }, h('div', { id }, children))
}

function Component2 ({ id, init, props, styles, slots }, children) {
  console.warn('Warning: Component is deprecated. Use defineComponent instead.')

  const hostKey = id + '-host'
  const host = h('div', { key: hostKey, id: hostKey }, [])

  if (slots) {
    for (const key in slots) {
      const slotKey = id + '-slot-' + host.children.length

      host.children.push(
        h('slot', { key: slotKey, slot: key }, slots[key])
      )
    }
  }

  // cache original setup function
  const setup = init.setup

  init.setup = function (state) {
    const render = setup(state)

    return function (props2, children2) {
      let vdom = render(props2, children2)

      // children cannot be guaranteed to be an array
      vdom = Array.isArray(vdom) ? vdom : [vdom]

      if (styles) {
        for (const key in styles) {
          const styleKey = id + '-style-' + vdom.length

          vdom.push(
            h('style', { id: styleKey, key: styleKey }, text(styles[key]))
          )
        }
      }

      return h('div', { id }, vdom)
    }
  }

  return Component({ host, init, props, patch }, children)
}

function defineComponent2 ({ id, styles, slots, props, children }, setup2) {
  const key = id + '-host'
  const host = h('div', { key, id: key }, [])

  if (slots) {
    for (const key in slots) {
      const slotKey = id + '-slot-' + host.children.length

      host.children.push(
        h('slot', { key: slotKey, slot: key }, slots[key])
      )
    }
  }

  function setup (useState) {
    const render = setup2(useState)

    return function (props2, children2) {
      let ch = render(props2, children2)

      // children cannot be guaranteed to be an array
      ch = Array.isArray(ch) ? ch : [ch]

      if (styles) {
        for (const key in styles) {
          const styleKey = id + '-style-' + host.children.length

          ch.push(
            h('style', { key: styleKey }, text(styles[key]))
          )
        }
      }

      return h('div', { id }, ch)
    }
  }

  return defineComponent({ host, patch, props, children }, setup)
}

export {
  ShadowRoot2 as ShadowRoot,
  IFrameRoot2 as IFrameRoot,
  Component2 as Component,
  defineComponent2 as defineComponent
}

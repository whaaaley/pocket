/* eslint-disable no-return-assign */

import { h, text, patch } from 'superfine'
import { ShadowRoot, InlineFrame, defineComponent } from '~/modules/pocket'

function ShadowRootWrapper (options, children) {
  const { styles, slots } = options ?? {}
  const host = h('div', {}, [])

  if (styles) {
    for (const key in styles) {
      children.push(h('style', {}, text(styles[key])))
    }
  }

  if (slots) {
    for (const key in slots) {
      host.children.push(h('div', { slot: key }, slots[key]))
    }
  }

  return ShadowRoot({ host, patch }, h('div', {}, children))
}

function InlineFrameWrapper (options, children) {
  const { styles } = options ?? {}
  const host = h('iframe', {})

  if (styles) {
    for (const key in styles) {
      children.push(h('style', {}, text(styles[key])))
    }
  }

  return InlineFrame({ host, patch }, h('div', {}, children))
}

function defineComponentWrapper (options, setup2) {
  const { props, slots, isolate } = options ?? {}
  const host = h('div', {}, [])

  if (slots) {
    for (const key in slots) {
      host.children.push(h('div', { slot: key }, slots[key]))
    }
  }

  return defineComponent({ props, host, patch, isolate }, context => {
    let styles
    context.styles = styles2 => styles = styles2

    const render2 = setup2(context)

    return function render (props2) {
      let children = render2(props2)
      children = Array.isArray(children) ? children : [children]

      if (styles) {
        for (const key in styles) {
          children.push(h('style', {}, text(styles[key])))
        }
      }

      return h('div', { id: 'root' }, children)
    }
  })
}

export {
  ShadowRootWrapper as ShadowRoot,
  InlineFrameWrapper as InlineFrame,
  defineComponentWrapper as defineComponent
}

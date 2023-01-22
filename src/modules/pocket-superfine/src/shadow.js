/* eslint-disable no-return-assign */

import { h, text, patch } from 'superfine'
import { defineShadowRoot, defineInlineFrame, defineComponent } from '~/modules/pocket/'

function shadowRootWrapper ({ styles, slots }, children) {
  const host = h('div', {}, [])

  if (styles) {
    for (const key in styles) {
      children.push(h('style', {}, text(styles[key])))
    }
  }

  if (slots) {
    for (const key in slots) {
      host.children.push(h('slot', { slot: key }, slots[key]))
    }
  }

  return defineShadowRoot({ host, patch }, h('div', {}, children))
}

function inlineFrameWrapper ({ styles }, children) {
  const host = h('iframe', {})

  if (styles) {
    for (const key in styles) {
      children.push(h('style', {}, text(styles[key])))
    }
  }

  return defineInlineFrame({ host, patch }, h('div', {}, children))
}

function componentWrapper ({ props, slots, isolate }, setup2) {
  const host = h('div', {}, [])

  if (slots) {
    for (const key in slots) {
      host.children.push(h('slot', { slot: key }, slots[key]))
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
  shadowRootWrapper as defineShadowRoot,
  inlineFrameWrapper as defineInlineFrame,
  componentWrapper as defineComponent
}

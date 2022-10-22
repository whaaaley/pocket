/* eslint-disable no-return-assign */

import { h, text, patch } from 'superfine'
import { defineShadowRoot, defineInlineFrame, defineComponent } from '~/modules/pocket/'

function defineShadowRoot2 ({ styles, slots }, children) {
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

function defineInlineFrame2 ({ styles }, children) {
  const host = h('iframe', {})

  if (styles) {
    for (const key in styles) {
      children.push(h('style', {}, text(styles[key])))
    }
  }

  return defineInlineFrame({ host, patch }, h('div', {}, children))
}

function defineComponent2 ({ props, slots }, setup2) {
  const host = h('div', {}, [])

  if (slots) {
    for (const key in slots) {
      host.children.push(h('slot', { slot: key }, slots[key]))
    }
  }

  return defineComponent({ props, host, patch }, context => {
    let styles
    context.useStyles = styles2 => styles = styles2

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
  defineShadowRoot2 as defineShadowRoot,
  defineInlineFrame2 as defineInlineFrame,
  defineComponent2 as defineComponent
}


import { h, text, patch } from 'superfine'
import * as pocket from '~/modules/pocket'

let index = 0

export function Component ({ id, styles, props, init }, children) {
  const setup = init.setup

  init.setup = function (state, dispatch) {
    const render = setup(state, dispatch)

    return function (props2, children2) {
      let view = render(props2, children2)
      view = Array.isArray(view) ? view : [view]

      if (styles) {
        for (const key in styles) {
          view.push(h('style', { key }, text(styles[key])))
        }
      }

      // TODO: slots

      return h('div', { id }, view)
    }
  }

  const host = h('div', {})

  return pocket.Component({ init, patch, host, props }, children)
}

export function IFrameRoot ({ id, styles }, children) {
  const host = h('iframe', {})

  if (styles) {
    for (const key in styles) {
      children.push(h('style', { key }, text(styles[key])))
    }
  }

  return pocket.IFrameRoot({ host, patch }, h('div', { id }, children))
}

export function ShadowRoot ({ id, styles, slots }, children) {
  const result = []
  const host = h('div', { key: index++ }, result)

  if (styles) {
    for (const key in styles) {
      children.push(h('style', { key }, text(styles[key])))
    }
  }

  if (slots) {
    for (const key in slots) {
      result.push(h('div', { key, slot: key }, slots[key]))
    }
  }

  return pocket.ShadowRoot({ host, patch }, h('div', { id }, children))
}

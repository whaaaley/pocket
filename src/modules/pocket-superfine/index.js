
import { h, text, patch } from 'superfine'
import * as pocket from '~/modules/pocket'

export function Component ({ id, style, props, init }, children) {
  const setup = init.setup

  init.setup = function (state, dispatch) {
    const render = setup(state, dispatch)

    return function (props2, children2) {
      let view = render(props2, children2)
      view = Array.isArray(view) ? view : [view]

      if (style) {
        view.push(h('style', {}, text(style)))
      }

      return h('div', { id }, view)
    }
  }

  return pocket.Component({ init, patch, host: h('div', {}), props }, children)
}

export function IFrameRoot ({ id, style }, children) {
  const host = h('iframe', {})

  if (style) {
    children.push(h('style', {}, text(style)))
  }

  return pocket.IFrameRoot({ host, patch }, h('div', { id }, children))
}

export function ShadowRoot ({ id, style, slots }, children) {
  const result = []
  const host = h('div', {}, result)

  if (style) {
    children.push(h('style', {}, text(style)))
  }

  if (slots) {
    for (const key in slots) {
      result.push(h('div', { slot: key }, slots[key]))
    }
  }

  return pocket.ShadowRoot({ host, patch }, h('div', { id }, children))
}

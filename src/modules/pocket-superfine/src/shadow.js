
import { h, patch } from 'superfine'
import { ShadowRoot, IFrameRoot, Component } from '~/modules/pocket/'
import { copy } from './lib/'

function ShadowRoot2 ({ id, styles, slots }, children) {
  const key = id + '-host'
  const host = h('div', { key, id: key }, [])

  copy('style', styles, children)
  copy('slot', slots, host.children)

  return ShadowRoot({ host, patch }, h('div', { id }, children))
}

function IFrameRoot2 ({ id, styles }, children) {
  const key = id + '-host'
  const host = h('iframe', { key, id: key })

  copy('slot', styles, children)

  return IFrameRoot({ host, patch }, h('div', { id }, children))
}

function Component2 ({ id, init, props, styles, slots }, children) {
  const key = id + '-host'
  const host = h('div', { key, id: key }, [])

  copy('slot', slots, host.children)

  // cache original setup function
  const setup = init.setup

  init.setup = function (state, dispatch) {
    const render = setup(state, dispatch)

    return function (props2, children2) {
      let vdom = render(props2, children2)
      vdom = Array.isArray(vdom) ? vdom : [vdom]

      // should vdom always be an array?
      // i haven't decided yet...
      copy('style', styles, vdom)

      return h('div', { id }, vdom)
    }
  }

  return Component({ host, init, props, patch }, children)
}

export {
  ShadowRoot2 as ShadowRoot,
  IFrameRoot2 as IFrameRoot,
  Component2 as Component
}


import { Component } from './shadow.js'

export default function (props, children) {
  const state = {
    component: null
  }

  props.module.then(function (data) {
    state.component = data.default()
  })

  return Component({
    id: 'async',
    init: { state, setup },
    slots: { children }
  })
}

function setup (state) {
  return function () {
    return state.component ?? <slot name='children'></slot>
  }
}

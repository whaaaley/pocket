
import { patch } from 'superfine'
import { Component } from './shadow.js'

// TODO: This is outdated now that Component has been replaced with defineComponent.

export default function (props, children) {
  const state = {
    success: null
  }

  const host = Component({
    id: 'async',
    init: { state, setup },
    slots: {
      children,
      component: null
    }
  })

  props.module.then(function (data) {
    state.success = true

    patch(
      host.node.querySelector('div[slot=component]'),
      <div slot='component'>{data.default(props.props, children)}</div>
    )
  })

  return host
}

function setup (state) {
  return function () {
    return <slot name={state.success ? 'component' : 'children'}></slot>
  }
}

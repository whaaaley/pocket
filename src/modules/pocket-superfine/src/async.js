
import { patch } from 'superfine'
import { defineComponent } from './shadow.js'

export default function (props, children) {
  const config = {
    stash: {
      props,
      children
    },
    slots: {
      default: null
    }
  }

  return defineComponent(config, function (context, host) {
    const state = context.useState({ success: null })

    props.module.then(function (data) {
      state.success = true

      patch(
        host.node.querySelector('div[slot=default]'),
        <div slot='default'>{data.default(props.props, children)}</div>
      )
    })

    return function (stash) {
      return <slot name='default'>{stash.children}</slot>
    }
  })
}

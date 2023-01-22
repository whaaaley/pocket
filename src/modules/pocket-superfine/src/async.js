
import { patch } from 'superfine'
import { defineComponent } from './shadow.js'

export default function defineAsyncComponent (props, children) {
  const options = {
    // stash: {
    //   props,
    //   children
    // },
    props: {
      props,
      children
    },
    slots: {
      default: null
    }
  }

  return defineComponent(options, function setup (context, host) {
    const state = context.reactive({ success: null })

    props.module.then(function handler (data) {
      state.success = true

      patch(
        host.node.querySelector('div[slot=default]'),
        <div slot='default'>
          {data.default(props.props, children)}
        </div>
      )
    })

    return _props => {
      return <slot name='default'>
        {_props.children}
      </slot>
    }
  })
}

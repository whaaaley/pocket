
import { patch } from 'superfine'
import { defineComponent } from './shadow.js'

export default (parentProps, children) => {
  const options = {
    props: {
      props: parentProps,
      children
    },
    slots: {
      default: null
    }
  }

  return defineComponent(options, context => {
    const state = context.reactive({
      success: null
    })

    parentProps.module.then(data => {
      state.success = true

      patch(
        context.host.querySelector('div[slot=default]'),
        <div slot='default'>
          {data.default(parentProps.props, children)}
        </div>
      )
    })

    return props => {
      return <slot name='default'>
        {props.children}
      </slot>
    }
  })
}

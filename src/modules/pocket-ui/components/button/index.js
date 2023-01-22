
import { defineComponent } from '~/modules/pocket-superfine'
import style from './_button.scss'

export default function Button (props, children) {
  // Render is called every state update

  const config = {
    stash: {
      // Nothing yet...
    },
    slots: {
      default: children
    }
  }

  return defineComponent(config, function setup (context) {
    // Setup is called only once when the component is created

    const state = context.reactive({ count: 0 })
    const styles = context.styles({ button: style })

    console.log('state >>', state)
    console.log('styles >>', styles)

    return function render (props) {
      // Render is called every state update

      return <button onclick={props?.onclick}>
        <slot name='default'/>
      </button>
    }
  })
}

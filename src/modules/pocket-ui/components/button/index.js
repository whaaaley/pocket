
import { defineComponent } from '~/modules/pocket-superfine'
import buttonStyles from './_button.scss'

export default function Button (props, children) {
  // Render is called every state update

  const options = {
    props: {
      // Nothing yet...
    },
    slots: {
      default: children
    }
  }

  return defineComponent(options, context => {
    // Setup is called only once when the component is created

    const state = context.reactive({ count: 0 })
    const styles = context.styles({ buttonStyles })

    console.log('state >>', state)
    console.log('styles >>', styles)

    return props => {
      // Render is called every state update

      return <button onclick={props?.onclick}>
        <slot name='default'/>
      </button>
    }
  })
}

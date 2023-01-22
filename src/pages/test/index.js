
import { defineComponent } from '~/modules/pocket-superfine'
import testStyles from './_test.scss'

const DisplayStream = (parentProps, children) => {
  const options = {
    isolate: true,
    props: parentProps,
    slots: {
      one: <div>{parentProps.countOne ?? '...'}</div>,
      two: <div>{parentProps.countTwo ?? '...'}</div>
    }
  }

  return defineComponent(options, context => {
    const state = context.reactive({
      count: 0,
      collection: []
    })

    context.watch({
      count: (value, oldValue) => {
        state.collection.push({
          id: crypto.randomUUID(),
          count: value
        })
      }
    })

    context.styles({
      default: testStyles
    })

    function increment () {
      state.count++
    }

    return props => {
      return <div class='page'>
        <button onclick={increment}>
          <span>Manual Increment</span>
        </button>
        <div style='padding: 12px'>
          <h1>Collection</h1>
          <div class='collection'>
            {state.collection.map(item => {
              return <div class='item'>
                <div>id: {item.count}</div>
                <div>uuid: {item.id}</div>
              </div>
            })}
          </div>
        </div>
        <div style='padding: 12px'>
          <h1>Slots</h1>
          <slot name='one'/>
          <slot name='two'/>
        </div>
        <div style='padding: 12px'>
          <h1>Parent props</h1>
          <div>{parentProps.countOne ?? '...'}</div>
          <div>{parentProps.countTwo ?? '...'}</div>
        </div>
        <div style='padding: 12px'>
          <h1>Render props</h1>
          <div>{props.countOne ?? '...'}</div>
          <div>{props.countTwo ?? '...'}</div>
        </div>
      </div>
    }
  })
}

export default {
  setup (state, dispatch) {
    setInterval(() => { dispatch('foobar.plusOne') }, 1000)
    setInterval(() => { dispatch('foobar.plusTwo') }, 1500)

    return () => {
      return <div id='page-test'>
        <DisplayStream
          countOne={state.foobar.countOne}
          countTwo={state.foobar.countTwo}
        />
      </div>
    }
  },
  destroy () {
    // Nothing yet...
  }
}

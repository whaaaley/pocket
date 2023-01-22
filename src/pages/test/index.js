
import { defineComponent } from '~/modules/pocket-superfine'
import Button from '~/modules/pocket-ui/components/button'

const DisplayStream = (props, children) => {
  const options = {
    isolate: true,
    props: {
      ...props,
      collection: []
    },
    slots: {
      one: <div>{props?.countOne ?? 'abc'}</div>,
      two: <div>{props?.countTwo ?? 'abc'}</div>
    }
  }

  return defineComponent(options, context => {
    const state = context.reactive({
      red: 100,
      green: 100,
      blue: 100,
      count: 0,
      dataStream1: [],
      dataStream2: []
    })

    context.watch({
      count: (value, oldValue) => {
        state.dataStream1.push(value)
      }
    })

    context.styles({
      other: 'div { background: rgb(var(--red), var(--green), var(--blue)); }'
    })

    function randomUpdate () {
      state.count++
      state.red = Math.floor(Math.random() * 255)
      state.green = Math.floor(Math.random() * 255)
      state.blue = Math.floor(Math.random() * 255)
    }

    return _props => {
      return <div>
        {state.count}
        <button onclick={randomUpdate}>
          Click to update interal data
        </button>
        {/*  */}
        <div style='padding: 12px'>
          <h1>props</h1>
          <div>{props?.countOne ?? '???'}</div>
          <div>{props?.countTwo ?? '???'}</div>
        </div>
        {/*  */}
        <div style='padding: 12px'>
          <h1>props2</h1>
          <div>{_props?.countOne ?? '???'}</div>
          <div>{_props?.countTwo ?? '???'}</div>
        </div>
        {/*  */}
        <div style='padding: 12px'>
          <h1>slots</h1>
          <slot name='one'/>
          <slot name='two'/>
        </div>
        {/*  */}
        <div style='padding: 12px'>
          <h1>data stream 1</h1>
          {state.dataStream1.map(item => <div>{item}</div>)}
        </div>
        {/*  */}
        <div style={`padding: 12px; --red: ${state.red}; --green: ${state.green}; --blue: ${state.blue}`}>
          <h1>data stream 2</h1>
          {state.dataStream2.map(item => <div>{item}</div>)}
        </div>
      </div>
    }
  })
}

export default {
  setup (state, dispatch) {
    // setup

    function click () {
      console.log('click')
    }

    setInterval(() => { dispatch('foobar.plusOne') }, 1000)
    setInterval(() => { dispatch('foobar.plusTwo') }, 1500)

    return () => {
      // computed
      // console.log(state.foobar)

      return <div id='page-retodo'>
        <DisplayStream
          countOne={state.foobar.countOne}
          countTwo={state.foobar.countTwo}
        />
        <Button onclick={click}>
          <span>Button</span>
        </Button>
      </div>
    }
  },
  destroy () {

  }
}

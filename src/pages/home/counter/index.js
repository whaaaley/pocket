
import { defineComponent } from '~/modules/pocket-superfine'
import counterStyles from './_counter.scss'

export default (parentProps, children) => {
  const options = {
    props: parentProps,
    slots: {
      children
    }
  }

  return defineComponent(options, context => {
    context.styles({ counterStyles })

    const state = context.reactive({
      count: 0
    })

    function minus () {
      state.count--
    }

    function plus () {
      state.count++
    }

    return props => {
      return <div id='counter'>
        <button class='-minus' onclick={minus}></button>
        <div class='count'>{state.count}</div>
        <button class='-plus' onclick={plus}></button>
      </div>
    }
  })
}

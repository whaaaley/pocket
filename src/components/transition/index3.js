
import cc from 'classcat'
import css from '~/modules/css-concat.js'
import { defineComponent } from '~/modules/pocket-superfine'
import style from './_transition.scss'

export default function (props, children) {
  const id = 'transition'
  const styles = [style]
  const slots = {
    from: props.slots.from,
    to: props.slots.to,
    next: props.slots.next
  }

  // Props is cached between renders.
  // We don't want to save references to slots if we don't need to.
  props.slots = undefined

  return defineComponent({ id, styles, slots, props, children }, function (useState) {
    const state = useState({
      count: 0
    })

    function minus () {
      state.count--
    }

    function plus () {
      state.count++
    }

    return function (props2, children2) {
      const from = cc(['from', props2.from && 'fade-out'])
      const to = cc(['to', props2.to && 'fade-in'])
      const next = cc(['next', props2.next && 'fade-in'])

      const vars = css({
        '--duration': props2.duration
      })

      return <>
        <div class={from} style={vars} key='transition-from'>
          <slot name='from'/>
        </div>
        <div class={to} style={vars} key='transition-to'>
          <slot name='to'/>
        </div>
        <div class={next} style={vars} key='transition-next'>
          <slot name='next'/>
        </div>
        <h1>Counter</h1>
        <button onclick={minus}>minus</button>
        <div>{state.count}</div>
        <button onclick={plus}>plus</button>
        okay this should update tho {props2.count}
        {children2}
      </>
    }
  })
}

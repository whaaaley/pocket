
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

  return defineComponent({ id, styles, slots, props, children }, function (useState) {
    const state = useState({
      showFrom: true
    })

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
      </>
    }
  })
}

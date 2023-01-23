
import cc from 'classcat'
import css from '~/modules/css-concat.js'
import { Component } from '~/modules/pocket-superfine'
import style from './_transition.scss'

export default function ({ duration, slots }, children) {
  const state = {
    showFrom: true
  }

  const result = Component({
    id: 'transition',
    init: { state, setup },
    styles: [style],
    slots: {
      from: slots.from,
      to: slots.to,
      next: slots.next
    },
    props: {
      duration
    }
  })

  return result
}

// index.js:63 Uncaught DOMException: Failed to execute 'insertBefore' on
// 'Node': The node before which the new node is to be inserted is not a child
// of this node.

function setup () {
  return function (props) {
    const from = cc(['from', props.from && 'fade-out'])
    const to = cc(['to', props.to && 'fade-in'])
    const next = cc(['next', props.next && 'fade-in'])

    const vars = css({
      '--duration': props.duration
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
}


import { Component } from '~/modules/pocket-superfine'
import style from './_counter.scss'

export default function () {
  const state = {
    count: 0
  }

  return Component({
    id: 'counter',
    init: { state, setup },
    styles: [style]
  })
}

function setup (state) {
  function minus () {
    state.count--
  }

  function plus () {
    state.count++
  }

  return function () {
    return <>
      <button class='-minus' onclick={minus}></button>
      <div class='count'>{state.count}</div>
      <button class='-plus' onclick={plus}></button>
    </>
  }
}

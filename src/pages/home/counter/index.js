
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

function plus (state) {
  state.count++
}

function minus (state) {
  state.count--
}

function setup (state) {
  const onPlus = () => plus(state)
  const onMinus = () => minus(state)

  return function () {
    return <>
      <button class='-minus' onclick={onMinus}></button>
      <div class='count'>{state.count}</div>
      <button class='-plus' onclick={onPlus}></button>
    </>
  }
}


import { Component } from '~/modules/pocket-superfine'
import style from './_counter.scss'

export default function () {
  const state = {
    count: 0
  }

  return Component({
    id: 'counter',
    init: { state, setup },
    style
  })
}

function plus (state) {
  state.count++
}

function minus (state) {
  state.count--
}

function setup (state, commit) {
  const onPlus = () => commit(plus)
  const onMinus = () => commit(minus)

  return function () {
    return <>
      <button class='-minus' onclick={onMinus}></button>
      <div class='count'>{state.count}</div>
      <button class='-plus' onclick={onPlus}></button>
    </>
  }
}


import cc from 'classcat'
import { Component } from '~/modules/pocket-superfine'
import style from './_install.scss'

export default function () {
  const state = {
    copied: false
  }

  return Component({
    id: 'install',
    init: { state, setup },
    styles: [style]
  })
}

function setup (state) {
  function copy () {
    state.copied = true

    setTimeout(function () {
      state.copied = false
    }, 2000)

    navigator.clipboard.writeText('npm i @onclick/pocket-superfine')
  }

  return function () {
    return <>
      <div class='command'>
        <span>$ </span>npm i @onclick/pocket-superfine
      </div>
      <button class={cc({ '-copied': state.copied })} aria-label='Copy Command' onclick={copy}>
        {state.copied ? 'Copied!' : ''}
      </button>
    </>
  }
}

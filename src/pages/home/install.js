
import cc from 'classcat'
import { defineComponent } from '~/modules/pocket-superfine'
import installStyles from './_install.scss'

export default (parentProps, children) => {
  return defineComponent(null, context => {
    context.styles({ installStyles })

    const state = context.reactive({
      copied: false
    })

    function copy () {
      state.copied = true

      setTimeout(() => {
        state.copied = false
      }, 2000)

      navigator.clipboard.writeText('npm i @onclick/pocket-superfine')
    }

    return props => {
      return <div id='install'>
        <div class='command'>
          <span>$ </span>npm i @onclick/pocket-superfine
        </div>
        <button class={cc({ '-copied': state.copied })} aria-label='Copy Command' onclick={copy}>
          {state.copied ? 'Copied!' : ''}
        </button>
      </div>
    }
  })
}

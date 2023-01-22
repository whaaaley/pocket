
import { link } from '~/modules/pocket'
import { ShadowRoot } from '~/modules/pocket-superfine'
import heroStyles from './_hero.scss'

export default function Hero (props, children) {
  return <ShadowRoot styles={{ heroStyles }} slots={{ children }}>
    <div id='hero'>
      <h1>The Micro Framework</h1>
      <h1>for <span>Universal Components</span></h1>
      <h2>A tiny library for building small applications.</h2>
      <div class='actions'>
        <button class='-get-started' onclick={() => link('/guide')}>Get Started</button>
        <a href='https://github.com/whaaaley/pocket' target='_blank'>Github</a>
      </div>
      <slot name='children'/>
    </div>
  </ShadowRoot>
}

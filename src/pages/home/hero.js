
import { link } from '~/modules/pocket'
import { ShadowRoot } from '~/modules/pocket-superfine'
import heroStyles from './_hero.scss'

export default function Hero (props, children) {
  return <ShadowRoot styles={{ heroStyles }} slots={{ children }}>
    <div key='component-hero' id='hero'>
      <h1>The Micro Framework</h1>
      <h1>for <span>Universal Components</span></h1>
      <h2>A tiny library for building small applications.</h2>
      <div class='actions'>
        <button class='-get-started' onclick={() => link('/guide')}>Get Started</button>
        <button onclick={() => window.open('https://github.com/whaaaley/pocket', '_blank')}>Github</button>
      </div>
      <slot name='children'/>
    </div>
  </ShadowRoot>
}

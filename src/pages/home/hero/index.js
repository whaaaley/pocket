
import { link } from '~/modules/pocket'
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_hero.scss'

export default function () {
  function getStarted () {
    link('/guide')
  }

  return <ShadowRoot id='hero' styles={[style]}>
    <h1>The Micro Framework</h1>
    <h1>for <span>Universal Components</span></h1>
    <h2>A tiny library for building small applications.</h2>
    <div class='actions'>
      <button class='-get-started' onclick={getStarted}>Get Started</button>
      <button>Learn More</button>
    </div>
  </ShadowRoot>
}

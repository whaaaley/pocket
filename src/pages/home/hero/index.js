
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_hero.scss'

export default function () {
  return <ShadowRoot id='hero' styles={[style]}>
    <h1>The Micro Framework</h1>
    <h1>for Universal Components</h1>
    <h2>A tiny library for building small applications.</h2>
    <div class='actions'>
      <button class='-get-started'>Get Started</button>
      <button>Learn More</button>
    </div>
  </ShadowRoot>
}

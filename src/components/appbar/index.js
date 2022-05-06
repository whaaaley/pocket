
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_appbar.scss'

import Link from '~/components/link.js'

export default function () {
  return <ShadowRoot id='layout' style={style}>
    <nav>
      <Link to='/guide'>Guide</Link>
      <Link to='/api'>API</Link>
      <Link to='/games'>Games</Link>
      <Link to='/about'>About</Link>
      <a href='https://github.com/whaaaley/pocket'>Github</a>
    </nav>
  </ShadowRoot>
}

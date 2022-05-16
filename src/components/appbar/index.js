
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_appbar.scss'

import Link from '~/components/link.js'

export default function () {
  return <ShadowRoot id='appbar' styles={[style]}>
    <header>
      <Link to='/' class='logo'>Home</Link>
      <div>{/* empty */}</div>
      <nav>
        <Link to='/guide'>Guide</Link>
        <Link to='/api'>API</Link>
        <Link to='/games'>Games</Link>
        <a href='https://github.com/whaaaley/pocket'>Github</a>
      </nav>
    </header>
  </ShadowRoot>
}

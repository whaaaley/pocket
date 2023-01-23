
import { ShadowRoot } from '~/modules/pocket-superfine'
import appbarStyles from './_appbar.scss'
import Link from '~/components/link.js'

export default (props, children) => {
  return <ShadowRoot styles={{ appbarStyles }} slots={{ children }}>
    <div key='component-appbar' id='appbar'>
      <header>
        <Link to='/' class='logo'>Home</Link>
        <div>{/* empty */}</div>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/guide'>Guide</Link>
          <Link to='/games'>TicTacToe</Link>
          <a href='https://github.com/whaaaley/pocket' target='_blank'>GitHub</a>
        </nav>
      </header>
    </div>
  </ShadowRoot>
}

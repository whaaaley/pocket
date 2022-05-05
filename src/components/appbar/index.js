
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_appar.scss'

export default function (props, children) {
  return <ShadowRoot id='layout' style={style}>
    <nav>
      <Link to='/guide'>Guide</Link>
      <Link to='/api'>API</Link>
      <Link to='/about'>About</Link>
      <a href='https://github.com/whaaaley/pocket'>Github</a>
    </nav>
  </ShadowRoot>
}


import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_layout.scss'

import Appbar from '~/components/appbar'

export default function (xxx, children) {
  return <ShadowRoot id='layout' styles={[style]} slots={{ children }}>
    <Appbar/>
    <main>
      <slot name='children'/>
    </main>
    <footer>
      {/* <p>&copy; 2022</p> */}
    </footer>
  </ShadowRoot>
}

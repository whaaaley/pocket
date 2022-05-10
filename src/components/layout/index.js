
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_layout.scss'

import Appbar from '~/components/appbar'
import Link from '~/components/link.js'

export default function (xxx, children) {
  return <ShadowRoot id='layout' styles={[style]} slots={{ children }}>
    <header>
      <Link to='/' class='-logo'>
        {/* nothing yet... */}
      </Link>
      <div>
        {/* nothing yet... */}
      </div>
      <Appbar/>
    </header>
    <main>
      <slot name='children'/>
    </main>
    <footer>
      <p>&copy; 2022</p>
    </footer>
  </ShadowRoot>
}


import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_about.scss'

import Layout from '~/components/layout'

export default {
  setup () {
    return function () {
      return <div>
        <ShadowRoot id='about' style={style}>
          <Layout>
            <div>This is the about page.</div>
          </Layout>
        </ShadowRoot>
      </div>
    }
  },
  destroy () {
    // nothing yet...
  }
}

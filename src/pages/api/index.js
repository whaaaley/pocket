
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_api.scss'

import Layout from '~/components/layout'

export default {
  setup () {
    return function () {
      return <div>
        <ShadowRoot id='api' styles={[style]}>
          <Layout>
            <div>This is the API page.</div>
          </Layout>
        </ShadowRoot>
      </div>
    }
  },
  destroy () {
    // nothing yet...
  }
}


import { ShadowRoot } from '~/modules/pocket-superfine'
import renderMd from '~/modules/render-md.js'
import style from './_guide.scss'

import Layout from '~/components/layout'

export default {
  setup (state, dispatch) {
    dispatch('docs/fetchDocument', { key: 'intro' })

    return function () {
      return <div>
        <ShadowRoot id='guide' styles={[style]}>
          <Layout>
            {state.docs.intro.loading
              ? <div>Loading...</div>
              : <div>{renderMd(state.docs.intro.data)}</div>}
          </Layout>
        </ShadowRoot>
      </div>
    }
  },
  destroy () {
    // nothing yet...
  }
}

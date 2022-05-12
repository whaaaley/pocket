
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_guide.scss'

import Layout from '~/components/layout'
import Markdown from '~/components/markdown'

export default {
  setup (state, dispatch) {
    dispatch('docs/fetchDocument', { key: 'intro' })

    return function () {
      return <div id='app'>
        <ShadowRoot id='guide' styles={[style]}>
          <Layout>
            {state.docs.intro.loading
              ? <div>Loading...</div>
              : <Markdown data={state.docs.intro.data}/>}
          </Layout>
        </ShadowRoot>
      </div>
    }
  },
  destroy () {
    // nothing yet...
  }
}


import { Async, ShadowRoot } from '~/modules/pocket-superfine'
import style from './_guide.scss'

import Layout from '~/components/layout'
import Markdown from '~/components/markdown'

export default {
  setup (state, dispatch) {
    return function () {
      return <div id='page-guide'>
        <ShadowRoot id='guide' styles={[style]}>
          <Layout>
            <div class='page'>
              <Markdown>
                <Async module={import('./intro.mdx')}>
                  <div>Loading...</div>
                </Async>
              </Markdown>
            </div>
          </Layout>
        </ShadowRoot>
      </div>
    }
  },
  destroy () {
    // nothing yet...
  }
}

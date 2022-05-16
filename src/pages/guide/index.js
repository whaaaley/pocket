
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_guide.scss'

import Layout from '~/components/layout'
import Markdown from '~/components/markdown'

import Intro from './intro.mdx'

export default {
  setup (state, dispatch) {
    return function () {
      return <div id='app'>
        <ShadowRoot id='guide' styles={[style]}>
          <Layout>
            <div class='page'>
              <Markdown>
                <Intro/>
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

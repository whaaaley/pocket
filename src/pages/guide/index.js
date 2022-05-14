
import { ShadowRoot } from '~/modules/pocket-superfine'

import md from '../_md.scss'
import prismjs from '../_prismjs.scss'
import style from './_guide.scss'

import Layout from '~/components/layout'
import Intro from './intro.mdx'

export default {
  setup (state, dispatch) {
    return function () {
      return <div id='app'>
        <ShadowRoot id='guide' styles={[md, prismjs, style]}>
          <Layout>
            <div class='page'>
              {Intro().children}
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

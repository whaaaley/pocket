
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_home.scss'

import Layout from '~/components/layout'

import Hero from './hero.js'
import Content from './content.mdx'

export default {
  setup (state, dispatch) {
    return function () {
      return <div>
        <ShadowRoot id='home' styles={[style]}>
          <Layout>
            <Hero/>
            <div class='page'>
              <Content/>
            </div>
          </Layout>
        </ShadowRoot>
      </div>
    }
  },
  destroy () {
    // ...
  }
}

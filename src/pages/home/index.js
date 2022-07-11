
import { Async, ShadowRoot } from '~/modules/pocket-superfine'
import style from './_home.scss'

import Layout from '~/components/layout'
import Hero from './hero.js'

export default {
  setup (state, dispatch) {
    return function () {
      return <div id='page-home'>
        <ShadowRoot id='home' styles={[style]}>
          <Layout>
            <Hero/>
            <div class='page'>
              <Async module={import('./content.mdx')}>
                <div style='min-height: 1309px'>
                  {/* CLS - Height from Chrome DevTools */}
                </div>
              </Async>
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

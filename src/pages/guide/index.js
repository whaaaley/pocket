
import { Async, ShadowRoot } from '~/modules/pocket-superfine'
import style from './_guide.scss'

import Layout from '~/components/layout'
import Markdown from '~/components/markdown'

// import Intro from './intro.mdx'

export default {
  setup (state, dispatch) {
    return function () {
      return <div id='app'>
        <ShadowRoot id='guide' styles={[style]}>
          <Layout>
            <div class='page'>
              {/* <h1>{state.common.count} counter</h1> */}
              {/* <Async module={import('./test.js')} props={{
                count: state.common.count,
                onPlus () {
                  dispatch('common/plus')
                },
                onMinus () {
                  dispatch('common/minus')
                }
              }}>
                <h1>{state.common.count} hold on i'm loading...</h1>
              </Async> */}
              <Markdown>
                <Async module={import('./intro.mdx')}>
                  <h1>{state.common.count} hold on i'm loading...</h1>
                </Async>
                {/* <Intro/> */}
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

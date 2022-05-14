
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_home.scss'

import Layout from '~/components/layout'

import Hero from './hero'
import Counter from './counter'

export default {
  setup (state, dispatch) {
    return function () {
      return <div>
        <ShadowRoot id='home' styles={[style]}>
          <Layout>
            {/* <ShadowRoot id='count'>
              <button onclick={() => dispatch('common/plus')}>Plus</button>
              <button>{state.common.count}</button>
              <button onclick={() => dispatch('common/minus')}>Minus</button>
            </ShadowRoot> */}
            <Hero/>
            <Counter/>
          </Layout>
        </ShadowRoot>
      </div>
    }
  },
  destroy () {
    // ...
  }
}

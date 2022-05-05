
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_home.scss'

import Layout from '~/components/layout'
import Hero from './hero'
import Counter from './counter'

export default {
  setup (state, dispatch) {
    return function () {
      return <div>
        <ShadowRoot id='home' style={style}>
          <Layout>
            <h1>I get my styles from my mother. My mother is "home".</h1>
            <h1>{JSON.stringify(state)}</h1>
            <h1>id {state.router.id}</h1>
            <h1>query {state.router.query}</h1>
            <h1>to {state.router.to}</h1>
            <Hero/>
            <Counter/>
            <Counter/>
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

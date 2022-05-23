
import { Async, ShadowRoot } from '~/modules/pocket-superfine/'
import style from './_games.scss'

import Layout from '~/components/layout/'

export default {
  setup (state, dispatch) {
    return function () {
      return <div>
        <ShadowRoot id='games' styles={[style]}>
          <Layout>
            <Async module={import('./tictactoe/')}>
              <div>Loading...</div>
            </Async>
          </Layout>
        </ShadowRoot>
      </div>
    }
  },
  destroy () {
    // ...
  }
}

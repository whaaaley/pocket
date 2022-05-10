
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_games.scss'

import Layout from '~/components/layout'
import Tictactoe from './tictactoe'

export default {
  setup (state, dispatch) {
    return function () {
      return <div>
        <ShadowRoot id='games' styles={[style]}>
          <Layout>
            <Tictactoe/>
          </Layout>
        </ShadowRoot>
      </div>
    }
  },
  destroy () {
    // ...
  }
}

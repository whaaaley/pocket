
import { AsyncComponent, ShadowRoot } from '~/modules/pocket-superfine/'
import gamesStyles from './_games.scss'

import Layout from '~/components/layout/'

const Games = (props, children) => {
  return <ShadowRoot styles={{ gamesStyles }}>
    <div key='component-games' id='games'>
      <AsyncComponent module={import('./tictactoe')}>
        <div>Loading...</div>
      </AsyncComponent>
    </div>
  </ShadowRoot>
}

export default {
  setup (state, dispatch) {
    return () => {
      return <div key='page-games'>
        <Layout>
          <Games/>
        </Layout>
      </div>
    }
  },
  destroy () {
    // Nothing yet...
  }
}

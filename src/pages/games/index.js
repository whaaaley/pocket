
import { AsyncComponent, ShadowRoot } from '~/modules/pocket-superfine/'
import gamesStyles from './_games.scss'

import Layout from '~/components/layout/'

const PageGames = (props, children) => {
  return <ShadowRoot styles={{ gamesStyles }}>
    <div key='page-games' id='games'>
      <AsyncComponent module={import('./tictactoe')}>
        <div>Loading...</div>
      </AsyncComponent>
    </div>
  </ShadowRoot>
}

export default {
  setup (state, dispatch) {
    return () => {
      return <Layout>
        <PageGames/>
      </Layout>
    }
  },
  destroy () {
    // Nothing yet...
  }
}

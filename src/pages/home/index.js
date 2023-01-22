
import { ShadowRoot, AsyncComponent } from '~/modules/pocket-superfine'
import homeStyles from './_home.scss'

import Layout from '~/components/layout'
import Hero from './hero.js'
import Install from './install.js'

const Page = (props, children) => {
  return <ShadowRoot styles={{ homeStyles }} slots={{ children }}>
    <div id='home'>
      <Layout>
        <Hero>
          <Install/>
        </Hero>
        <div class='page'>
          <AsyncComponent module={import('./content.mdx')}>
            <div style='min-height: 1309px'>
              {/* CLS - Height from Chrome DevTools */}
            </div>
          </AsyncComponent>
        </div>
      </Layout>
    </div>
  </ShadowRoot>
}

export default {
  setup (state, dispatch) {
    return () => {
      return <Page/>
    }
  },
  destroy () {
    // Nothing yet...
  }
}

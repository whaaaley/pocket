
import { ShadowRoot, AsyncComponent } from '~/modules/pocket-superfine'
import homeStyles from './_home.scss'

import Layout from '~/components/layout'
import Hero from './hero.js'
import Install from './install.js'

const PageHome = (props, children) => {
  return <ShadowRoot styles={{ homeStyles }} slots={{ children }}>
    {/* CLS - Height from Chrome DevTools */}
    <div key='page-home' id='home' style='min-height: 1963.5px'>
      <Hero>
        <Install/>
      </Hero>
      <div class='page'>
        <AsyncComponent module={import('./content.mdx')}>
          <div>Loading...</div>
        </AsyncComponent>
      </div>
    </div>
  </ShadowRoot>
}

export default {
  setup (state, dispatch) {
    return () => {
      return <Layout>
        <PageHome/>
      </Layout>
    }
  },
  destroy () {
    // Nothing yet...
  }
}


import { ShadowRoot, AsyncComponent } from '~/modules/pocket-superfine'
import guideStyles from './_guide.scss'

import Layout from '~/components/layout'
import Markdown from '~/components/markdown'

const PageGuide = () => {
  return <ShadowRoot styles={{ guideStyles }}>
    <div id='guide'>
      <div class='page'>
        <Markdown>
          <AsyncComponent module={import('./intro.mdx')}>
            <div style='min-height: 0px'>
              <div>Loading...</div>
              {/* CLS - Height from Chrome DevTools */}
            </div>
          </AsyncComponent>
        </Markdown>
      </div>
    </div>
  </ShadowRoot>
}

export default {
  setup (state, dispatch) {
    return () => {
      return <Layout>
        <PageGuide/>
      </Layout>
    }
  },
  destroy () {
    // Nothing yet...
  }
}

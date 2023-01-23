
import { ShadowRoot, AsyncComponent } from '~/modules/pocket-superfine'
import guideStyles from './_guide.scss'

import Layout from '~/components/layout'
import Markdown from '~/components/markdown'

const Page = (props, children) => {
  return <ShadowRoot styles={{ guideStyles }}>
    <div id='guide'>
      <Layout>
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
      </Layout>
    </div>
  </ShadowRoot>
}

export default {
  setup (state, dispatch) {
    return () => {
      return <div id='page-guide'>
        <Page/>
      </div>
    }
  },
  destroy () {
    // Nothing yet...
  }
}

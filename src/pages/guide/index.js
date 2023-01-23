
import { ShadowRoot, AsyncComponent } from '~/modules/pocket-superfine'
import guideStyles from './_guide.scss'

import Layout from '~/components/layout'
import Markdown from '~/components/markdown'

const Guide = (props, children) => {
  return <ShadowRoot styles={{ guideStyles }} slots={{ children }}>
    {/* CLS - Height from Chrome DevTools */}
    <div key='component-guide' id='guide' style='min-height: 6077.5px'>
      <div class='page'>
        <Markdown>
          <AsyncComponent module={import('./intro.mdx')}>
            <div>Loading...</div>
          </AsyncComponent>
        </Markdown>
      </div>
    </div>
  </ShadowRoot>
}

export default {
  setup (state, dispatch) {
    return () => {
      return <div key='page-guide'>
        <Layout>
          <Guide/>
        </Layout>
      </div>
    }
  },
  destroy () {
    // Nothing yet...
  }
}


import { ShadowRoot, AsyncComponent } from '~/modules/pocket-superfine'
import guideStyles from './_guide.scss'

import Layout from '~/components/layout'
import Markdown from '~/components/markdown'

const PageGuide = (props, children) => {
  return <ShadowRoot styles={{ guideStyles }} slots={{ children }}>
    {/* CLS - Height from Chrome DevTools */}
    <div key='page-guide' id='guide' style='min-height: 6077.5px'>
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
      return <Layout>
        <PageGuide/>
      </Layout>
    }
  },
  destroy () {
    // Nothing yet...
  }
}

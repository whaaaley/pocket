
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_home.scss'

import Layout from '~/components/layout'
import Markdown from '~/components/markdown'
import CodeTabs from '~/components/code-tabs'

import Hero from './hero.js'
import Rationale from './docs/rationale.mdx'
import Script from './tabs/script.mdx'
import Style from './tabs/style.mdx'

export default {
  setup (state, dispatch) {
    const tabs = [{
      title: 'index.js',
      content: <Script/>
    }, {
      title: '_counter.scss',
      content: <Style/>
    }]

    return function () {
      return <div>
        <ShadowRoot id='home' styles={[style]}>
          <Layout>
            <Hero/>
            <div class='page'>
              <Markdown>
                <Rationale/>
              </Markdown>
              <CodeTabs tabs={tabs}/>
            </div>
          </Layout>
        </ShadowRoot>
      </div>
    }
  },
  destroy () {
    // ...
  }
}

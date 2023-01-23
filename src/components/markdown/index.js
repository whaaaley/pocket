
import { ShadowRoot } from '~/modules/pocket-superfine'

import markdownStyles from './_markdown.scss'
import prismjs from './_prismjs.scss'

export default (props, children) => {
  return <ShadowRoot styles={{ markdownStyles, prismjs }}>
    <div key='component-markdown' id='markdown'>
      {children}
    </div>
  </ShadowRoot>
}

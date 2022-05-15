
import { ShadowRoot } from '~/modules/pocket-superfine'

import style from './_markdown.scss'
import prismjs from './_prismjs.scss'

export default function (props, children) {
  return <ShadowRoot id='markdown' styles={[style, prismjs]}>
    {children}
  </ShadowRoot>
}

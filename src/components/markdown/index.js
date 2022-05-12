
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_markdown.scss'

import renderMd from '~/modules/render-md.js'

export default function (props) {
  let ref

  requestAnimationFrame(function () {
    // eslint-disable-next-line no-undef
    Prism.highlightAllUnder(ref.node)
  })

  // eslint-disable-next-line no-return-assign
  return <ShadowRoot id='markdown' styles={[style]}>
    {ref = renderMd(props.data)}
  </ShadowRoot>
}

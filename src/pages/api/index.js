
import { ShadowRoot } from '~/modules/pocket-superfine'
import style from './_api.scss'

import Layout from '~/components/layout'
import Transition from '~/components/transition'
import Test from '~/components/transition/index3.js'
import Aggregate from '~/components/aggregate'

function Item (props) {
  if (props == null) {
    return
  }

  const key = props.random

  return <div key={key} style={`width: 300px; height 200px; background: ${props.color};`}>
    <h1>{props.name} {props.random}</h1>
    <p>This is the <code>{props.name}</code> element.</p>
  </div>
}

let _from
let _to
let _next
let index = 1

export default {
  setup (state, dispatch) {
    const colors = ['dodgerblue', 'orange', 'green', 'purple', 'blue', 'red']
    const names = ['FOO', 'BAR', 'BAZ', 'QUX', 'QUUX', 'QUUZ']

    const randomColor = () => colors[Math.floor(Math.random() * colors.length)]
    const randomName = () => names[Math.floor(Math.random() * names.length)]

    setInterval(() => {
      _from = _to
      _to = _next
      _next = {
        name: randomName(),
        color: randomColor(),
        random: index++
      }

      dispatch('common/plus')
    }, 1000)

    return function () {
      return <div id='page-api'>
        <ShadowRoot id='api' styles={[style]}>
          <Layout>
            <Aggregate item={Math.random()}/>
            <div>This is the API page.</div>
            <div>This is the API page.</div>
            <div>This is the API page.</div>
            <Test duration='1s' slots={{
              from: Item(_from),
              to: Item(_to),
              next: Item(_next)
            }}>
              <div>{state.common.count}</div>
            </Test>
            {/* <Transition duration='1s' slots={{ from, to, next }}/> */}
          </Layout>
        </ShadowRoot>
      </div>
    }
  },
  destroy () {
    // nothing yet...
  }
}


import cc from 'classcat'
import { link } from '~/modules/pocket'

export default (props, children) => {
  const { to, query } = props

  const classList = cc([
    to === location.pathname && 'active',
    props.class
  ])

  function click (event) {
    event.preventDefault()
    link(to, query)
  }

  return <a href={to} class={classList} onclick={click}>
    <span>{children}</span>
  </a>
}

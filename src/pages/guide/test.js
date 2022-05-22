
export default function (props, children) {
  function minus () {
    props.onPlus()
  }

  function plus () {
    props.onMinus()
  }

  return <div>
    <button class='-minus' onclick={minus}>minus</button>
    <div class='count'>{props.count}</div>
    <button class='-plus' onclick={plus}>plus</button>
  </div>
}

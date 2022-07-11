
// This is an example component that aggregates props passed in from a parent
// over mutiple renders.

import { defineComponent } from '~/modules/pocket-superfine'

const persist = []
const fruit = ['apple', 'orange', 'banana', 'pear', 'strawberry']

export default function (props, children) {
  const id = 'aggregate'
  const styles = []

  persist.push(props.item)

  return defineComponent({ id, styles, props, children }, useState => {
    // This works because we're not breaking the reference to the array.
    // In this instance `persist` is the source of truth.
    const state = useState({
      storage: persist
    })

    function click () {
      // Place a random fruit into storage.
      state.storage.push(fruit[Math.floor(Math.random() * fruit.length)])

      // Self assignment causes the reactive object to re-render the view.
      // eslint-disable-next-line no-self-assign
      state.storage = state.storage
    }

    return (props2, children2) => <ul onclick={click}>
      {state.storage.map(item => <li>{item}</li>)}
    </ul>
  })
}

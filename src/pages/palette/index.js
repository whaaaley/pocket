
import { ShadowRoot } from '~/modules/pocket-superfine'
import paletteStyles from './_palette.scss'

const rainbow = [
  'red',
  'yellow',
  'green',
  'blue',
  'purple'
]

const light = [
  'light-500',
  'light-400',
  'light-300',
  'light-200',
  'light-100'
]

const dark = [
  'dark-500',
  'dark-400',
  'dark-300',
  'dark-200',
  'dark-100'
]

function Group (props) {
  return <div class='group'>
    {props.arr.map(color => <div class={color}>{color}</div>)}
  </div>
}

export default {
  setup (state, dispatch) {
    return () => {
      return <div key='page-palette' id='palette'>
        <ShadowRoot styles={{ paletteStyles }}>
          <div key='component-palette' id='palette'>
            <Group arr={rainbow}/>
            <Group arr={light}/>
            <Group arr={dark}/>
          </div>
        </ShadowRoot>
      </div>
    }
  },
  destroy () {
    // ...
  }
}

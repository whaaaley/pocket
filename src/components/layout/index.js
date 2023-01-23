
import { ShadowRoot } from '~/modules/pocket-superfine'
import layoutStyles from './_layout.scss'
import Appbar from '~/components/appbar'

export default (props, children) => {
  return <ShadowRoot styles={{ layoutStyles }} slots={{ children }}>
    <div key='layout' id='layout'>
      <Appbar/>
      <main>
        <slot name='children'/>
      </main>
      <footer>
        <p>Pocket &copy; 2023 Dustin Dowell</p>
      </footer>
    </div>
  </ShadowRoot>
}

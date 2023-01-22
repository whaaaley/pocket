
import { defineComponent } from '~/modules/pocket-superfine'
import Hero from './hero.js'

function Page (props, children) {
  const config = {
    stash: {
      props: null
    },
    slots: {
      default: null
    }
  }

  return defineComponent(config, ({ reactive, styles }) => {
    const data = reactive({
      counter: 0,
      text: 'hello world'
    })

    const updateText = e => {
      data.text = e.target.value
    }

    return stash => {
      return <div>
        <Hero>hi</Hero>
        <h1>{data.text}</h1>
        <input value={data.text} oninput={updateText}/>
      </div>
    }
  })
}

export default {
  setup (state, dispatch) {
    return () => <Page/>
  },
  destroy () {
    // nothing yet...
  }
}

// import { Async, ShadowRoot } from '~/modules/pocket-superfine'
// import style from './_home.scss'
//
// import Layout from '~/components/layout'
// import Hero from './hero.js'
//
// export default {
//   setup (state, dispatch) {
//     return function () {
//       return <div id='page-home'>
//         <ShadowRoot id='home' styles={[style]}>
//           <Layout>
//             <Hero/>
//             <div class='page'>
//               <Async module={import('./content.mdx')}>
//                 <div style='min-height: 1309px'>
//                   {/* CLS - Height from Chrome DevTools */}
//                 </div>
//               </Async>
//             </div>
//           </Layout>
//         </ShadowRoot>
//       </div>
//     }
//   },
//   destroy () {
//     // ...
//   }
// }


import cc from 'classcat'
import { defineComponent } from '~/modules/pocket-superfine'
import codeTabsStyles from './_code-tabs.scss'
import Markdown from '~/components/markdown'

export default (props, children) => {
  return defineComponent({ props }, context => {
    context.styles({ codeTabsStyles })

    const state = context.reactive({
      copied: false,
      index: 0
    })

    function copyContent (value) {
      return () => {
        state.copied = true

        setTimeout(() => {
          state.copied = false
        }, 2000)

        navigator.clipboard.writeText(value)
      }
    }

    function setIndex (index) {
      return () => {
        state.index = index
      }
    }

    return props => {
      const tabs = props.tabs
      const content = tabs[state.index].content

      const classList = cc({
        'btn-copy': true,
        '-copied': state.copied
      })

      return <div key='component-code-tabs' id='code-tabs'>
        <div class='tabs'>
          {tabs.map((tab, index) => {
            const classList = cc(['btn-tab', index === state.index && '-active'])
            return <button class={classList} onclick={setIndex(index)}>
              {tab.title}
            </button>
          })}
        </div>
        <div class='content'>
          <button class={classList} aria-label='Copy Code' onclick={copyContent(content)}>
            {state.copied ? 'Copied!' : ''}
          </button>
          <Markdown>{content}</Markdown>
        </div>
      </div>
    }
  })
}

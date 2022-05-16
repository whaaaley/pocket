
import cc from 'classcat'
import { Component } from '~/modules/pocket-superfine'
import style from './_code-tabs.scss'

import Markdown from '~/components/markdown'

export default function (props) {
  const state = {
    copied: false,
    index: 0
  }

  return Component({
    id: 'code-tabs',
    init: { state, setup },
    styles: [style],
    props
  })
}

function setup (state) {
  function copyContent (value) {
    return function () {
      state.copied = true

      setTimeout(function () {
        state.copied = false
      }, 2000)

      navigator.clipboard.writeText(value)
    }
  }

  function setIndex (index) {
    return function () {
      state.index = index
    }
  }

  return function (props) {
    const tabs = props.tabs
    const content = tabs[state.index].content

    const classList = cc({
      'btn-copy': true,
      '-copied': state.copied
    })

    return <>
      <div class='tabs'>
        {tabs.map(function (tab, index) {
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
    </>
  }
}

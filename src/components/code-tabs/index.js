
import cc from 'classcat'
import { Component } from '~/modules/pocket-superfine'
import style from './_code-tabs.scss'

import Markdown from '~/components/markdown'

export default function (props) {
  const state = {
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
  function setIndex (index) {
    return function () {
      state.index = index
    }
  }

  return function (props) {
    const tabs = props.tabs

    return <>
      <div class='tabs'>
        {tabs.map(function (tab, index) {
          const classList = cc(['tab', index === state.index && '-active'])
          return <button class={classList} onclick={setIndex(index)}>
            {tab.title}
          </button>
        })}
      </div>
      <div class='content'>
        <Markdown>
          {tabs[state.index].content}
        </Markdown>
      </div>
    </>
  }
}

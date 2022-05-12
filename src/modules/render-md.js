
import { h, text } from 'superfine'

import { fromMarkdown } from 'mdast-util-from-markdown'
import { toHast } from 'mdast-util-to-hast'
import { toH } from 'hast-to-hyperscript'

export default function (data) {
  return toH(hfn, toHast(fromMarkdown(data)))
}

function hfn (tag, props, children) {
  if (tag === 'p' && children.length) {
    const child = children[0]
    let src = child.match(/{{(.*)}}/)

    if (src) {
      src = src[1].trim()

      return h('audio', { controls: true }, [
        h('source', { src, type: 'audio/ogg' }, [
          text('Your browser does not support the audio element.')
        ])
      ])
    }
  }

  const node = h(tag, props, children)
  const ch = node.children

  for (let i = 0; i < ch.length; i++) {
    const item = ch[i]

    if (typeof item === 'string') {
      ch[i] = text(item)
    }
  }

  return node
}

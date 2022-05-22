
import escapeHTML from 'escape-html'

function isSafe (value) {
  switch (typeof value) {
    case 'boolean': return true
    case 'number': return true
    case 'string': return true
  }
}

/**
 * Void tags derived from the WhatWG HTML spec:
 * https://html.spec.whatwg.org/multipage/syntax.html#elements-2
 */

const voidTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr']

function joinChildren (children) {
  let target = ''

  /**
   * -- Warning --
   * This returns unescaped text in the document. You should protect against
   * XSS before this point.
   */

  if (typeof children === 'string') {
    return children
  }

  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      const value = Array.isArray(child) ? child.join('') : child

      if (isSafe(value)) {
        target += value
      }
    }
  }

  return target
}

function joinProps (props) {
  let target = ''

  for (const key in props) {
    const value = props[key]

    if (isSafe(value)) {
      target += ' ' + key + '="' + escapeHTML(value) + '"'
    }
  }

  return target
}

export function staticNode (tag, props, children) {
  const target = '<' + tag + joinProps(props)

  if (voidTags.includes(tag)) {
    return target + '/>'
  }

  return target + '>' + joinChildren(children) + '</' + tag + '>'
}

export const staticText = escapeHTML

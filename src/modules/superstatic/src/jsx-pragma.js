
/**
 * Learn to setup JSX with esbuild here:
 * https://esbuild.github.io/content-types/#jsx
 */

import { staticNode, staticText } from './static-nodes'

const EMPTY_ARR = Object.freeze([])
const EMPTY_OBJ = Object.freeze({})

/**
 * Virtual nodes derived from:
 * https://github.com/jorgebucaran/superfine/blob/main/index.js
 */

export function virtualNode (type, props, children) {
  return {
    tag: type,
    props,
    key: props.key,
    children: children == null ? EMPTY_ARR : children
  }
}

export function virtualText (value) {
  return {
    tag: value,
    props: EMPTY_OBJ,
    children: EMPTY_ARR,
    type: 3
  }
}

/**
 * JSX pragma derived from:
 * https://github.com/zaceno/hyperapp-jsx-pragma/blob/main/index.js
 */

export function jsx (type, props, ...children) {
  props = props == null ? EMPTY_OBJ : props
  children = children.flat(Infinity)

  for (let i = 0; i < children.length; i++) {
    const child = children[i]

    children[i] = typeof child === 'string' || typeof child === 'number'
      ? virtualText(child)
      : child
  }

  if (typeof type === 'function') {
    return type(props, children)
  }

  if (type === 'fragment' || type == null) {
    return children
  }

  return virtualNode(type, props, children)
}

export function jsxFragment (props, ...children) {
  return jsx('fragment', props, children)
}

/**
 * JSX pragma that returns an HTML string
 */

const marker = '<!-- xxx -->'

export function jsxStatic (type, props, ...children) {
  props = props == null ? EMPTY_OBJ : props
  children = children.flat(Infinity)

  if (typeof type === 'function') {
    return type(props, children)
  }

  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    children[i] = child.startsWith(marker) ? child : staticText(child)
  }

  return marker + staticNode(type, props, children).replaceAll(marker, '')
}

// Note: MDX needs this
export default { jsx }

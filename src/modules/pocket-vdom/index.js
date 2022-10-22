
const nodeMap = new WeakMap()

export function h () {

}

export const patch = (node, virtualNode) =>
  patchElement({ node, virtualNode })

function createElement (tag, isSVG) {

}

const listener = event => {
  this.events[event.type]()
}

// const cache = nodeMap.get(node)

const patchProperty = (node, cache, key, value, oldValue) => {
  if (key[0] === 'o' && key[1] === 'n') {
    (cache.events ??= {})[key = key.slice(2)] = value
    nodeMap.set(node, cache)
    node[oldValue ? 'removeEventListener' : 'addEventListener'](key, listener)
    return
  }

  // node[key] = value ?? ''

  value ?? value === false
    ? node.removeAttribute(key)
    : node.setAttribute(key, value)
}

function patchElement (parent, node, virtualNode, oldVirtualNode, isSVG) {
}

function recycleElement (node) {

}

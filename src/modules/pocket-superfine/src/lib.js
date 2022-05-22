
import { h, text } from 'superfine'

function slot (key, value) {
  return h('div', { key, slot: key }, value)
}

function style (key, value) {
  return h('style', { key }, text(value))
}

const types = { slot, style }

export function copy (type, source, target) {
  if (source) {
    for (const key in source) {
      target.push(types[type](key, source[key]))
    }
  }
}


import { patch } from 'superfine'
import { core, pocket, router } from '~/modules/pocket'

function getElement (node) {
  return typeof node === 'string'
    ? document.getElementById(node)
    : node
}

function mount (fn, node, init) {
  return fn(init, function (view) {
    return patch(node, view)
  })
}

function core2 (node, init) {
  return mount(core, getElement(node), init)
}

function app (node, init) {
  return router(init, function (init2) {
    return mount(pocket, getElement(node), init2)
  })
}

export { app, core2 as core }

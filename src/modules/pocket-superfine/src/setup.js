
import { patch } from 'superfine'
import { core, pocket, router } from '~/modules/pocket'

function mount (fn, node, init) {
  const root = typeof node === 'string'
    ? document.getElementById(node)
    : node

  return fn(init, view => patch(root, view))
}

function core2 (node, init) {
  return mount(core, node, init)
}

function app (node, init) {
  return router(init, init2 => mount(pocket, node, init2))
}

export { app, core2 as core }

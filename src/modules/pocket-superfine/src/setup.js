
import { patch } from 'superfine'
import { core, pocket, router } from '~/modules/pocket'

function mount (func, node, init) {
  const root = typeof node === 'string'
    ? document.getElementById(node)
    : node

  return func(init, view => patch(root, view))
}

function coreWrapper (node, init) {
  return mount(core, node, init)
}

function app (node, init) {
  return router(init, init2 => mount(pocket, node, init2))
}

export { app, coreWrapper as core }

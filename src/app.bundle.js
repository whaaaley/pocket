
'use strict'

import { patch } from 'superfine'
import { pocket, router } from '~/modules/pocket'

const node = document.getElementById('pocket')

const context = init => pocket(init, view => patch(node, view))
const app = init => router(init, context)

app({
  stores: {
    common: require('~/stores/common.js').default,
    docs: require('~/stores/docs.js').default
  },
  pages: {
    '/': require('~/pages/home').default,
    '/guide': require('~/pages/guide').default,
    '/api': require('~/pages/api').default,
    '/about': require('~/pages/about').default
  },
  rewrites: [
    // nothing yet...
  ]
})

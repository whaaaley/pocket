
'use strict'

import { app } from '~/modules/pocket-superfine'

import home from './pages/home/index.js'
import retodo from './pages/retodo/index.js'
import test from './pages/test/index.js'

// import pages from './pages/**/*.js'
import stores from './stores/**/*.js'

app('pocket', {
  stores: {
    // common: stores.common
    // docs: stores.docs
    foobar: stores.foobar
  },
  pages: {
    '/': home,
    // '/guide': pages.guide,
    // '/api': pages.api,
    // '/games': pages.games,
    // '/about': pages.about,
    // '/palette': pages.palette,
    // '/missing': pages.missing,
    '/retodo': retodo,
    '/test': test
  },
  rewrites: [
    // nothing yet...
  ]
})

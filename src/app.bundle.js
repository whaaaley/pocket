
'use strict'

import { app } from '~/modules/pocket-superfine'

import test from './pages/test/index.js'
import retodo from './pages/retodo/index.js'

// import pages from './pages/**/*.js'
import stores from './stores/**/*.js'

app('pocket', {
  stores: {
    common: stores.common
    // docs: stores.docs
  },
  pages: {
    '/': test,
    '/retodo': retodo
    // '/': pages.home,
    // '/guide': pages.guide,
    // '/api': pages.api,
    // '/games': pages.games,
    // '/about': pages.about,
    // '/palette': pages.palette,
    // '/missing': pages.missing
  },
  rewrites: [
    // nothing yet...
  ]
})

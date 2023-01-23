
'use strict'

import { app } from '~/modules/pocket-superfine'

import home from './pages/home'
import guide from './pages/guide'
import retodo from './pages/retodo'
import test from './pages/test'

// import pages from './pages/**/*.js'
import stores from './stores/**/*.js'

app('pocket', {
  stores: {
    common: stores.common,
    foobar: stores.foobar
  },
  pages: {
    '/': home,
    '/guide': guide,
    // '/api': pages.api,
    // '/games': pages.games,
    // '/about': pages.about,
    // '/palette': pages.palette,
    // '/missing': pages.missing,
    '/retodo': retodo,
    '/test': test
  },
  rewrites: [
    // Nothing yet...
  ]
})

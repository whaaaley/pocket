
'use strict'

import { app } from '~/modules/pocket-superfine'

import home from './pages/home'
import guide from './pages/guide'
import games from './pages/games'
import retodo from './pages/retodo'

import palette from './pages/palette'
import missing from './pages/missing'
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
    '/games': games,
    '/retodo': retodo,
    //
    // Extra stuff...
    '/palette': palette,
    '/missing': missing,
    '/test': test
  },
  rewrites: [
    // Nothing yet...
  ]
})

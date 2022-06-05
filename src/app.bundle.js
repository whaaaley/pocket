
'use strict'

import { app } from '~/modules/pocket-superfine'

import pages from './pages/**/*.js'
import stores from './stores/**/*.js'

app('pocket', {
  stores: {
    common: stores.common,
    docs: stores.docs
  },
  pages: {
    '/': pages.home,
    '/guide': pages.guide,
    '/api': pages.api,
    '/games': pages.games,
    '/about': pages.about,
    '/palette': pages.palette,
    '/missing': {
      setup () {
        return function () {
          return <div>missing</div>
        }
      }
    }
  },
  rewrites: [
    // nothing yet...
  ]
})

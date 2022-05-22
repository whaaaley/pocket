
'use strict'

import { app } from '~/modules/pocket-superfine'

app('pocket', {
  stores: {
    common: require('~/stores/common.js').default,
    docs: require('~/stores/docs.js').default
  },
  pages: {
    '/': require('~/pages/home').default,
    // '/guide': import('~/pages/guide'),
    '/guide': require('~/pages/guide').default,
    '/api': require('~/pages/api').default,
    '/games': require('~/pages/games').default,
    '/about': require('~/pages/about').default,
    '/palette': require('~/pages/palette').default,
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

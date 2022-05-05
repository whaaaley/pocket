
// TODO: It would be pretty sick to have glob imports working...
// For example:
// import stores from '~/stores/**'
// import pages from '~/pages/**'

import fs from 'fs'
import path from 'path'

export default function (opts) {
  function handler (args) {
    let pathname = path.join(opts.home, args.path.slice(2))

    try {
      // NOTE: fs.lstatSync will throw an error if the path doesn't exist
      if (fs.lstatSync(pathname).isDirectory()) {
        pathname = path.join(pathname, '/index.js')
      }
    } catch {
      // Do nothing...
    }

    return {
      path: pathname
    }
  }

  return {
    name: 'plugin-resolution',
    setup (build) {
      build.onResolve({ filter: /^~\// }, handler)
    }
  }
}

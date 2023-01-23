
import fs from 'fs'
import path from 'path'

export default function resolvePlugin ({ loadpaths }) {
  function handler (args) {
    // TODO: remove dups

    for (let index = 0; index < loadpaths.length; index++) {
      let pathname = path.join(loadpaths[index], args.path.slice(2))

      try {
        // NOTE: fs.lstatSync will throw an error if the path doesn't exist
        if (fs.lstatSync(pathname).isDirectory()) {
          pathname = path.join(pathname, '/index.js')
        }

        return {
          path: pathname
        }
      } catch {
        // Do nothing...
      }
    }
  }

  return {
    name: 'plugin-resolve',
    setup (build) {
      build.onResolve({ filter: /^~\// }, handler)
      build.onResolve({ filter: /^@\// }, handler)
    }
  }
}

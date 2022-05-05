
import babel from '@babel/core'
import config from '../config.js'

function handler (args) {
  return {
    loader: 'jsx',
    contents: babel.transformFileSync(args.path, config.babel).code
  }
}

export default {
  name: 'plugin-babel',
  setup (build) {
    build.onLoad({ filter: /\.(js|jsx)$/ }, handler)
  }
}

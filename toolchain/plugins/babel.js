
import babel from '@babel/core'

export default function babelPlugin (opts) {
  function handler (args) {
    return {
      loader: 'jsx',
      contents: babel.transformFileSync(args.path, opts).code
    }
  }

  return {
    name: 'plugin-babel',
    setup (build) {
      build.onLoad({ filter: /\.(js|jsx|ts|tsx)$/ }, handler)
    }
  }
}

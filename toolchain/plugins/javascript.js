
import esbuild from 'esbuild'
import typescript from 'typescript'
import uglify from 'uglify-js'
import config from '../config.js'

const production = process.env.NODE_ENV === 'production'
const cache = {} // Persist across build errors

async function handler (args) {
  const path = args.path

  cache[path] = cache[path] == null
    ? await esbuild.build({ ...config.esbuild, entryPoints: [path] })
    : await cache[path].rebuild()

  let data = cache[path].outputFiles[0].contents.buffer
  data = Buffer.from(data).toString()

  if (production === true) {
    data = typescript.transpileModule(data, config.typescript).outputText
    data = uglify.minify(data, config.uglify).code
  }

  return {
    loader: 'text',
    contents: data
  }
}

export default {
  name: 'plugin-javascript',
  setup (build) {
    build.onLoad({ filter: /\.bundle\.(js|jsx)$/ }, handler)
  }
}

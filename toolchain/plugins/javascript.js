
import esbuild from 'esbuild'
import typescript from 'typescript'
import uglify from 'uglify-js'

const production = process.env.NODE_ENV === 'production'
const cache = {} // Persist across build errors

async function handler (args, options) {
  const path = args.path

  cache[path] = cache[path] == null
    ? await esbuild.build({ ...options.esbuild, entryPoints: [path] })
    : await cache[path].rebuild()

  let data = cache[path].outputFiles[0].contents.buffer
  data = Buffer.from(data).toString()

  if (production === true) {
    data = typescript.transpileModule(data, options.typescript).outputText
    data = uglify.minify(data, options.uglify).code
  }

  return {
    loader: 'text',
    contents: data
  }
}

export default function (options) {
  function load (args) {
    return handler(args, options)
  }

  return {
    name: 'plugin-javascript',
    setup (build) {
      build.onLoad({ filter: /\.bundle\.(js|jsx|ts|tsx)$/ }, load)
    }
  }
}

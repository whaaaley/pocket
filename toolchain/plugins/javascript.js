
import fs from 'node:fs'

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

  function process (file) {
    let data = file.contents.buffer
    data = Buffer.from(data).toString()

    if (production) {
      data = typescript.transpileModule(data, options.typescript).outputText
      data = uglify.minify(data, options.uglify).code
    }

    const bytes = Math.round(Buffer.byteLength(data) / 1000) + ' kB'
    console.log(bytes.padStart(8), file.path)

    return data
  }

  const [main, ...chunks] = cache[path].outputFiles

  for (let i = 0; i < chunks.length; i++) {
    const file = chunks[i]
    fs.writeFileSync(file.path, process(file))
  }

  return {
    loader: 'text',
    contents: process(main)
  }
}

export default function javascriptPlugin (options) {
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

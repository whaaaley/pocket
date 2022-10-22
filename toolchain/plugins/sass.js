
import path from 'path'
import sass from 'sass'
import CleanCSS from 'clean-css'

const production = process.env.NODE_ENV === 'production'
const cwd = process.cwd()

function handler (args, options) {
  try {
    const result = sass.compile(args.path, options.sass)
    const sourceMap = result.sourceMap

    sourceMap.file = args.path
    sourceMap.sources = sourceMap.sources.map(src => {
      return path.relative('file:' + cwd, src)
    })

    const buffer = Buffer.from(JSON.stringify(sourceMap))
    const sourceMappingURL = buffer.toString('base64')

    const suffix = '\n\n/*# sourceMappingURL=data:application/json;base64,'
    const data = result.css + suffix + sourceMappingURL + ' */'

    return {
      loader: 'text',
      contents: production
        ? new CleanCSS(options.cleancss).minify(data).styles
        : Buffer.from(data).toString()
    }
  } catch (err) {
    const start = err.span.start
    const end = err.span.end
    const lineText = err.span.context

    const lineEnd = start.line === end.line
      ? end.column
      : lineText.length

    return {
      errors: [{
        text: err.sassMessage,
        location: {
          line: start.line,
          column: start.column,
          length: lineEnd - start.column,
          lineText
        }
      }]
    }
  }
}

export default function sassPlugin (options) {
  function load (args) {
    return handler(args, options)
  }

  return {
    name: 'plugin-sass',
    setup (build) {
      build.onLoad({ filter: /\.scss$/ }, load)
    }
  }
}

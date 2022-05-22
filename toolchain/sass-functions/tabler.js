
import fs from 'node:fs'
import path from 'node:path'

import sass from 'sass'
import svgDataURI from 'mini-svg-data-uri'
import svgo from 'svgo'

const cache = new Map()
const svgPath = path.join(process.cwd(), './node_modules/@tabler/icons/icons')

const openTag = /(<svg.*?>)/
const strokeWidthAttr = /stroke-width=".*?"/
const strokeAttr = /stroke=".*?"/

const options = {
  multipass: true,
  plugins: [
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          'svg:class',
          'svg:width',
          'svg:height'
        ]
      }
    },
    {
      name: 'removeUselessStrokeAndFill',
      params: {
        stroke: true,
        fill: true,
        removeNone: true
      }
    },
    {
      name: 'removeDesc'
    }
  ]
}

export default {
  'tabler($name, $width, $color)': function ([name, width, color]) {
    name = name.assertString('name').text
    width = width.assertNumber('width').value
    color = color.assertColor('color').toString()

    const pathname = path.join(svgPath, name + '.svg')
    let template = cache.get(pathname)

    if (!template) {
      let file = fs.readFileSync(pathname)
      file = svgo.optimize(file, options).data

      let [, open, content] = file.split(openTag)

      template = function (width, color) {
        open = open.replace(strokeAttr, 'stroke="' + color + '"')
        open = open.replace(strokeWidthAttr, 'stroke-width="' + width + '"')

        return 'url("' + svgDataURI(open + content) + '")'
      }

      cache.set(path, template)
    }

    return new sass.SassString(template(width, color), {
      quotes: false
    })
  }
}

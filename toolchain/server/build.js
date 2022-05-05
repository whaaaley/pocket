
import fs from 'fs'
import { spawn } from 'child_process'
import esbuild from 'esbuild'
import { info } from './modules/log.js'
import now from './modules/now.js'
import { reload } from './reload.js'
import config from '../config.js'

const errorPage = fs.readFileSync('./toolchain/assets/error.html', 'utf8')
let errorCache = null

let reloadScript = fs.readFileSync('./toolchain/assets/reload.js', 'utf8')
reloadScript = '\n\n<script>' + reloadScript + '</script>'

let cache = null
let renderCache = '<h1 style="font: 24px/1 sans-serif">foobar</h1>'

async function render () {
  const process = spawn('node', ['-'])

  process.stdin.write(Buffer.from(cache.outputFiles[0].contents.buffer))
  process.stdin.end()

  renderCache = ''

  process.stdout.on('data', function (chunk) {
    renderCache += chunk
  })

  return new Promise(function (resolve) {
    process.on('exit', function () {
      resolve()
    })
  })
}

export function fromCache () {
  let result

  if (errorCache == null) {
    result = renderCache
  } else {
    result = errorCache
  }

  return result + reloadScript
}

export async function build () {
  try {
    let start = now()

    info('Building...')
    cache = cache == null
      ? await esbuild.build(config.main)
      : await cache.rebuild()

    info(`Build is done! ${now() - start}ms`)
    start = now()

    await render()
    info(`Rendering is done! ${now() - start}ms`)

    errorCache = null
  } catch (err) {
    // TODO: Build and serve the error app instead of the error page.
    errorCache = errorPage.replace('{{error}}', err)
  }

  reload()
}

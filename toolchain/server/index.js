
import fs from 'fs/promises'
import http from 'http'
import path from 'path'
import watch from './modules/watch.js'
import * as log from './modules/log.js'
import * as build from './build.js'
import * as reload from './reload.js'

const mediaTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

async function handler (req, res) {
  const bytesBefore = req.socket.bytesWritten
  const start = Date.now()

  res.on('finish', function () {
    log.request({
      ms: Date.now() - start,
      bytes: req.socket.bytesWritten - bytesBefore,
      method: req.method,
      status: res.statusCode,
      path: req.url
    })
  })

  const pathname = req.url
  const ext = path.extname(pathname)

  if (ext === '' || pathname === '/index.html') {
    res.setHeader('content-type', 'text/html')
    res.writeHead(200)

    return build.fromCache() // Exit
  }

  try {
    const file = await fs.readFile(path.join('./deploy/assets', pathname))

    res.setHeader('content-type', mediaTypes[ext] ?? 'text/plain')
    res.writeHead(200)

    return file // Exit
  } catch {
    res.setHeader('content-type', 'text/plain')
    res.writeHead(404)

    return 'Not found' // Exit
  }
}

export default async function (options) {
  const { port, extensions, watchDir } = options
  await build.build()

  const server = http.createServer(async function (req, res) {
    if (req.url === '/reload') {
      reload.handler(res)
    } else {
      res.setHeader('access-control-allow-origin', '*')
      res.end(await handler(req, res))
    }
  })

  server.listen(port, function () {
    watch(watchDir, async function (xxx, filename) {
      if (extensions.includes(path.extname(filename))) {
        console.log(/* New line */)
        log.info('Updated ' + path.join(watchDir, filename))
        await build.build()
      }
    })

    console.log(/* New line */)
    log.info('Server running at http://localhost:' + port)
  })
}

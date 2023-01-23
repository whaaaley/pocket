
import { extname, join } from 'https://deno.land/std/path/mod.ts'

const indexFile = await Deno.readFile('./deploy/dist/index.html')
const assets = join(Deno.cwd(), './deploy/assets')
const dist = join(Deno.cwd(), './deploy/dist')

const mediaTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.md': 'text/markdown',
  '.ogg': 'audio/ogg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

async function handler ({ method, url }) {
  const { pathname } = new URL(url)
  const ext = extname(pathname)

  console.log(method, url, ext)

  if (ext === '') {
    return new Response(indexFile, {
      status: 200,
      headers: {
        'content-type': 'text/html'
      }
    })
  }

  try {
    let file

    try {
      file = await Deno.readFile(join(dist, pathname))
    } catch {
      file = await Deno.readFile(join(assets, pathname))
    }

    return new Response(file, {
      status: 200,
      headers: {
        'content-type': mediaTypes[ext] ?? 'text/plain;charset=utf-8',
        'cache-control': ext === '.woff2'
          ? 'max-age=31536000'
          : 'no-cache' // TODO: expand cached media types
      }
    })
  } catch {
    return new Response('Not Found', {
      status: 404,
      headers: {
        'content-type': 'text/plain;charset=utf-8'
      }
    })
  }
}

// Start server
void async function () {
  const server = Deno.listen({ port: 3000 })

  console.log('Listening on http://localhost:3000')

  for await (const conn of server) {
    void async function () {
      for await (const event of Deno.serveHttp(conn)) {
        event.respondWith(handler(event.request))
      }
    }()
  }
}()

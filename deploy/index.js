
import { extname, join } from 'https://deno.land/std/path/mod.ts'

const indexFile = await Deno.readFile('./deploy/dist/index.html')
const assets = join(Deno.cwd(), './assets')

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

async function handler (pathname) {
  const ext = extname(pathname)

  if (ext === '') {
    return new Response(indexFile, {
      status: 200,
      headers: {
        'content-type': 'text/html'
      }
    })
  }

  try {
    return new Response(await Deno.readFile(join(assets, pathname)), {
      status: 200,
      headers: {
        'content-type': mediaTypes[ext] ?? 'text/plain;charset=utf-8'
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

async function start () {
  const port = 8000

  console.log('Listening on https://localhost:' + port)

  for await (const conn of Deno.listen({ port })) {
    for await (const event of Deno.serveHttp(conn)) {
      //
      const { method, redirect, url } = event.request
      const { pathname } = new URL(url)

      console.log(method, redirect, url)

      event.respondWith(await handler(pathname))
    }
  }
}

start()

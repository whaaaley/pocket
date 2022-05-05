
import crypto from 'crypto'
import * as log from './modules/log.js'

const clients = new Map()

export function handler (res) {
  const id = crypto.randomBytes(6).toString('hex')

  res.setHeader('content-type', 'text/event-stream')
  res.write('data:connect\n\n')

  clients.set(id, res)
  log.info('Client connected ' + id)

  const heartbeat = setInterval(function () {
    res.write('data:heartbeat\n\n')
  }, 90000)

  res.on('close', function () {
    log.info('Client disconnected ' + id)
    clearInterval(heartbeat)
    clients.delete(id)
  })
}

export function reload () {
  for (const [key] of clients) {
    clients.get(key).write('data:reload\n\n')
  }
}

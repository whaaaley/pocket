
import fs from 'node:fs'
import path from 'node:path'

function throttle (handler, delay) {
  let last = 0

  return dir => (eventType, filepath) => {
    const now = Date.now()

    if (now - last > delay) {
      last = now
      handler(eventType, path.resolve(dir, filepath))
    }
  }
}

export default async function watch (root, handler) {
  const dirs = [root]
  const listener = throttle(handler, 1000)

  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i]
    const children = fs.readdirSync(dir)

    for (let j = 0; j < children.length; j++) {
      const childPath = path.resolve(dir, children[j])

      if (fs.lstatSync(childPath).isDirectory()) {
        dirs.push(childPath)
      }
    }

    fs.watch(dir, listener(dir))
  }
}

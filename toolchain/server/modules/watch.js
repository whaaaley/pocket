
import fs from 'fs'
import path from 'path'

function debounce (handler) {
  let timeout = null

  return function (eventType, filename) {
    const later = function () {
      timeout = null
      handler(eventType, filename)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, 100)
  }
}

export default async function (root, handler) {
  const dirs = [root]
  const listener = debounce(handler)

  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i]
    const children = fs.readdirSync(dir)

    for (let j = 0; j < children.length; j++) {
      const childPath = path.resolve(dir, children[j])

      if (fs.lstatSync(childPath).isDirectory()) {
        dirs.push(childPath)
      }
    }

    fs.watch(dir, listener)
  }
}

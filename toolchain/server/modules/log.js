
const colorMap = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
}

function color (name, string) {
  return colorMap[name] + string + '\x1b[0m'
}

function statusColor (code) {
  if (code < 200) { return 'blue' }
  if (code < 300) { return 'green' }
  if (code < 400) { return 'yellow' }
  return 'red'
}

const start = Date.now()

function elapsed () {
  const duration = Date.now() - start
  const timestamp = new Date(duration).toISOString().slice(11, 19)
  return `[${timestamp}]`
}

let lastType = null

export function info (message) {
  if (lastType === 'request') {
    console.log(/* New line */)
  }

  lastType = 'info'

  console.log(
    color('blue', elapsed()),
    color('white', message)
  )
}

export function request (data) {
  if (lastType === 'info') {
    console.log(/* New line */)
  }

  lastType = 'request'

  const size = data.bytes < 1000
    ? data.bytes + 'B'
    : Math.round(data.bytes / 1000) + 'kB'

  console.log(
    color('blue', elapsed()),
    (data.ms + 'ms').padEnd(6, ' '),
    size.padStart(6, ' '),
    (data.method).padEnd(6, ' '),
    color(statusColor(data.status), data.status),
    color('white', data.path)
  )
}

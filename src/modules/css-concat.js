
export default function (props) {
  let out = ''

  for (const key in props) {
    const value = props[key]

    if (typeof value === 'string' || typeof value === 'number') {
      out += key + ': ' + value + ';'
    }
  }

  return out
}


export function clone (obj) {
  const result = {}

  for (const key in obj) {
    result[key] = obj[key]
  }

  return result
}

export function decode (data) {
  const query = data.slice(1).split(/[&=]/g)
  const result = {}

  for (let i = 0; i < query.length; i += 2) {
    result[query[i]] = query[i + 1]
  }

  return result
}

export function encode (data) {
  let result = '?'

  for (const key in data) {
    if (data[key] != null) {
      result += key + '=' + data[key] + '&'
    }
  }

  return result.slice(0, -1)
}


export default function deepFreeze (src) {
  if (src === null) {
    return null
  }

  for (const key in src) {
    const value = src[key]

    if (typeof value === 'object' && Object.isFrozen(value) === false) {
      deepFreeze(value)
    }
  }

  return Object.freeze(src)
}

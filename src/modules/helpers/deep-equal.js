
function isObject (value) {
  return typeof value === 'object' && value !== null
}

export default function deepEqual (target, src) {
  if (target === src) {
    return true
  }

  if (!isObject(target) || !isObject(src)) {
    return false
  }

  if (Object.keys(target).length !== Object.keys(src).length) {
    return false
  }

  for (const key in target) {
    const targetValue = target[key]
    const srcValue = src[key]

    if (!deepEqual(targetValue, srcValue)) {
      return false
    }
  }

  return true
}

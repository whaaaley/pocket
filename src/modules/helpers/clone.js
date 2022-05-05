
export default function (src) {
  const target = {}

  for (const key in src) {
    target[key] = src[key]
  }

  return target
}


export default function (target, src) {
  for (const key in src) {
    target[key] = src[key]
  }
}

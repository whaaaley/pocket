
export default function assign (target, src) {
  for (const key in src) {
    target[key] = src[key]
  }
}

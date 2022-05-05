
export default function (ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms)
  })
}

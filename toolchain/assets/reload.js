
const source = new EventSource('/reload')

source.onmessage = function (body) {
  switch (body.data) {
    case 'connect':
      console.log('Connected to automatic reload')
      break
    case 'reload':
      window.location.reload()
      break
    default:
      console.log('Heartbeat from automatic reload')
  }
}


import { request, mockRequest, requestStore } from '~/modules/pocket-request'

const docs = {
  pocket: '/docs/api/pocket.md',
  router: '/docs/api/router.md',
  shadow: '/docs/api/shadow.md',
  intro: '/docs/guide/intro.md',
  quickStart: '/docs/guide/quick-start.md'
}

export default requestStore({
  init: [
    'pocket',
    'router',
    'shadow',
    'intro',
    'quickStart',
    'nothing'
  ],
  state: {
    // nothing yet...
  },
  actions: {
    fetchNothing () {
      return mockRequest('docs', {
        key: 'nothing',
        delay: 1000,
        payload: {
          foo: 'bar'
        }
      })
    },
    fetchDocument (xxx, data) {
      return request('docs', {
        key: data.key,
        type: 'text',
        url: docs[data.key],
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        }
      })
    }
  }
})

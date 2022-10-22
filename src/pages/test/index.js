
import Button from '~/modules/pocket-ui/components/button'

export default {
  setup (state, dispatch) {
    // setup

    function click () {
      console.log('click')
    }

    return function () {
      // computed

      return <div id='page-retodo'>
        <h1>Button</h1>
        <div>
          <template shadowroot='open'>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
          </template>
        </div>
        <Button onclick={click}>
          <span>Button</span>
        </Button>
      </div>
    }
  },
  destroy () {

  }
}

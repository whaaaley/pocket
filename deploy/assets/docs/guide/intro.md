
# Intro

## What is Pocket?

```ogg
audio/what-is-pocket.ogg
```

Pocket is a library for building web components and small applications. Like many frameworks, it provides a component-based model to create interfaces combined with state management, page routing, and style encapsulation.

Here's a basic example showcasing reactivity in Pocket. This example uses [Superfine](https://github.com/jorgebucaran/superfine) and [JSX](https://github.com/facebook/jsx) to render the view. The package `pocket-superfine` wires Pocket and Superfine together! This is the reccomended way to use Pocket.

```js
import { core } from 'pocket-superfine'

const app = core('app')

app({
  state: {
    count: 0
  },
  setup
})

function setup (state) {
  function plus () {
    state.count++
  }

  return <button onclick={plus}>
    Count: {state.count}
  </button>
}
```

<!--
## Project Goals

The primary goals of Pocket and related modules are as follows:

+ Very small bundle size.
+ Global and local state managment.
+ A full featured page router.
+ Style encapsulation with shadow DOM.
+ Components that can be used in any framework.
-->

## Applying Styles

```ogg
audio/applying-styles.ogg
```

Pocket uses shadow DOM to encapsulate styles. The package `pocket-superfine` exports functions that wire Pocket and Superfine together!

Continuing from the previous example, and assuming you're using a bundler capable of importing CSS as a string, like [Parcel](https://parceljs.org/features/bundle-inlining/), here's how'd you the `ShadowRoot()` component from `pocket-superfine` to apply styles.

```js
import { core, ShadowRoot } from 'pocket-superfine'
import style from './counter.css'

const app = core('app')

app({
  state: {
    count: 0
  },
  setup
})

function setup (state) {
  function plus () {
    state.count++
  }

  return () => <ShadowRoot id='counter' styles={[style]}>
    <button onclick={plus}>
      Count: {state.count}
    </button>
  </ShadowRoot>
}
```

## Managing Global State

```ogg
audio/managing-global-state.ogg
```

As your application grows in size it's common to break down concepts of your application into logic containers. In Pocket this is done with the `pocket()` function. This function is a wrapper around `core()` used in previous examples. This function is equivalent to Redux for React or Vuex for Vue.

This is what `pocket()` changes:
  + The `state` and `actions` properties on `app()`'s `init` object are replaced with the `store` property.
  + State can no longer be mutated to trigger renders.
  + Actions must now return a state object to trigger renders.
  + The setup function now exposes a `dispatch()` function in the paramters.

Here's how you'd create a simple counter using `pocket()` to manage state globaly.

```js
import { pocket } from 'pocket-superfine'

const app = pocket('app')

app({
  stores: {
    counter
  },
  setup
})

const counter = {
  state: {
    count: 0
  },
  actions: {
    plus (state) {
      state.count++
      return state
    }
  }
}

function setup (state, dispatch) {
  return () => <button onclick={() => dispatch('counter/plus')}>
    Count: {state.count}
  </button>
}
```

## Routing

```ogg
audio/routing.ogg
```

Much like how `pocket()` wraps `core()` to add logic containers, `router()` wraps `pocket()` to add page routing.

<!--
This router wrapper exposes two extra properties on our `init` object. Those properties are `pages` and `rewrites`.
-->

Here's what `router()` changes:
  + Two extra properties are exposed on `app()`'s `init` object, `pages` and `rewrites`.
  + The `setup()` function is moved from the root of the `init` object to inside each page object.
  + Each page object also includes a `destroy()` function.

Continuing with the counter example, here is an example of the router.

```js
import { pocket } from 'pocket-superfine'

const app = pocket('app')

app({
  stores: {
    counter
  },
  pages: {
    '/': home
  }
})

const counter = {
  state: {
    count: 0
  },
  actions: {
    plus (state) {
      state.count++
      return state
    }
  }
}

const home = {
  setup (state, dispatch) {
    return () => <button onclick={() => dispatch('counter/plus')}>
      Count: {state.count}
    </button>
  },
  destroy () {
    // nothing yet...
  }
}
```

## Managing Local State

```ogg
audio/managing-local-state.ogg
```

As your application grows even further it's also common to avoid adding small bits of state in the global state object and instead keep unimportant parts of state inside of stateful components. In Pocket we use the function `Component()` to do this. Local state in `Component()` internally uses the very same `core()` function used in the first example of this introduction.

Also, in Pocket the concept of localized state is combined with the use of shadow DOM for style encapsulation. As a result, much like the `ShadowRoot()` component I reccomend using `pocket-superfine` which wires Pocket and Superfine together!

Here is an example of a reusable counter component with local state and encapsulated styles.

```js
import { core, Component } from 'pocket-superfine'

const app = core('app')

function Counter () {
  const state = {
    count: 0
  }

  return Component({
    id: 'counter',
    init: { state, setup },
    style
  })
}

function setup (state, commit) {
  function plus () {
    state.count++
  }

  return function () {
    return <button onclick={plus}>
      {state.count}
    </button>
  }
}

app({
  state: {},
  setup () {
    return () => <Counter/>
  }
})
```

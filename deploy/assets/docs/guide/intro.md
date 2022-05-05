
# Intro

## What is Pocket?

Pocket is a library for building web components and small applications. Like many frameworks it provides a component-based model to build interfaces while also including utilities for managing state, page routing, and style encapsulation with shadow DOM.

Here's a basic example using Superfine and JSX as the view layer.

```js
import { core } from 'pocket'
import { patch } from 'superfine'

const node = document.getElementById('pocket')
const app = init => core(init, view => patch(node, view))

app({
  state: {
    count: 0
  },
  setup
})

function plus () {
  state.count++
}

function setup (state, commit) {
  return <button onclick={() => commit(plus))}>
    Count: {state.count}
  </button>
}
```

## Project Goals

The primary goals of Pocket and related modules are as follows:

+ Very small bundle size.
+ Global and local state managment.
+ A full featured page router.
+ Style encapsulation with shadow DOM.
+ Components that can be used in any framework.

## Applying Styles

As described previously the desired way to apply styles in Pocket is through the use of shadow DOM. Pocket provides utility functions to do this, however I reccomend that you use `pocket-superfine`. The utilities in this module are already wired for use with Superfine.

Continuing from the previous example, and assuming you're using a bundler capable of importing CSS as a string, here's how'd you the `ShadowRoot()` component to apply styles.

```js
import { core } from 'pocket'
import { patch } from 'superfine'
import { ShadowRoot } from 'pocket-superfine'
import style from './counter.css'

const node = document.getElementById('pocket')
const app = init => core(init, view => patch(node, view))

app({
  state: {
    count: 0
  },
  setup
})

function plus () {
  state.count++
}

function setup (state, commit) {
  return () => <ShadowRoot id='counter' style={style}>
    <button onclick={() => commit(plus)}>
      Count: {state.count}
    </button>
  </ShadowRoot>
}
```

## Managing Global State

As your application grows in size it's common to break down concepts of your application into logic stores. In Pocket this is done with the `pocket()` function. This function is a wrapper around `core()` used in previous examples.

Here's how you'd create a simple counter using `pocket()` to manage your global state.

```js
import { pocket } from 'pocket'
import { patch } from 'superfine'

const node = document.getElementById('pocket')
const app = init => pocket(init, view => patch(node, view))

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

Much like how `pocket()` wraps `core()` to add logic containers, `router()` wraps `pocket()` to add page routing. This router wrapper exposes two extra properties on our `init` object. Those properties are `pages` and `rewrites`.

Continuing with the counter example, here is a basic example of the router.

```js
import { pocket } from 'pocket'
import { patch } from 'superfine'

const node = document.getElementById('pocket')
const app = init => pocket(init, view => patch(node, view))

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
    }
  }
}

const home = {
  setup (state, dispatch) {
    return () =>  <button onclick={() => dispatch('counter/plus')}>
      Count: {state.count}
    </button>
  },
  destroy () {
    // nothing yet...
  }
}
```

## Managing Local State

As your application grows even further it's also common to avoid adding small bits of state in the global state object and instead keep unimportant parts of state inside of stateful components. In Pocket we use the function `Component()` to do this. Local state in `Component()` internally uses the very same `core()` function used in the very first example of this introduction.

Also, in Pocket the concept of localized state is combined with the use of shadow DOM for style encapsulation. As a result, much like `ShadowRoot()` I reccomend using `pocket-superfine` which is already wired to be used with Superfine.

An example of a reusable counter component with local state and encapsulated styles is as follows.

```js
import { core } from 'pocket'
import { patch } from 'superfine'
import { Component } from 'pocket-superfine'

const node = document.getElementById('pocket')
const app = init => core(init, view => patch(node, view))

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

function plus (state) {
  state.count++
}

function setup (state, commit) {
  return function () {
    return <button onclick={() => commit(plus)}>
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

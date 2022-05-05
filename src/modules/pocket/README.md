
## Component usage example:

```jsx
import { patch } from 'superfine'
import { Component } from '~/modules/shadow'
import style from './style.css'

export default (props, children) => {
  const init = {
    state: {},
    actions: {},
    setup (state, dispatch) {
      return (props, children) => <div>{children}</div>
    }
  }

  return <Component init={init} host={<div></div>} patch={patch} props={props}>
    <div id='my-component'>
      <style>{style}</style>
      <p>This is a paragraph.</p>
    </div>
  </Component>
}
```

## IFrameRoot usage example:

```jsx
import { patch } from 'superfine'
import { IFrameRoot } from '~/modules/shadow'
import style from './style.css'

export default function (props, children) {
  return <IFrameRoot host={<iframe></iframe>} patch={patch}>
    <div id='my-shadow'>
      <style>{style}</style>
      <p>This is a paragraph.</p>
    </div>
  </IFrameRoot>
}
```

## ShadowRoot usage example:

```jsx
import { patch } from 'superfine'
import { ShadowRoot } from '~/modules/shadow'
import style from './style.css'

export default function (props, children) {
  return <ShadowRoot host={<div></div>} patch={patch}>
    <div id='my-shadow'>
      <style>{style}</style>
      <p>This is a paragraph.</p>
    </div>
  </ShadowRoot>
}
```

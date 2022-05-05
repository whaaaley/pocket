
import { jsx, jsxStatic } from './src/jsx-pragma.js'
import deepEqual from '~/modules/helpers/deep-equal.js'

function testEqual (result, expected) {
  console.log(deepEqual(result, expected) ? 'ok' : 'not ok')
  console.log(result)
  console.log(expected)
  console.log('---')
}

function jsxSingle () {
  const result = jsx('div', null, 'foobar')
  const expected = {
    tag: 'div',
    props: {},
    key: undefined,
    children: [{
      tag: 'foobar',
      props: {},
      children: [],
      type: 3
    }]
  }

  testEqual(result, expected)
}

function jsxChild () {
  const result = jsx('div', null, jsx('div', null, 'foobar'))
  const expected = {
    tag: 'div',
    props: {},
    key: undefined,
    children: [{
      tag: 'div',
      props: {},
      key: undefined,
      children: [{
        tag: 'foobar',
        props: {},
        children: [],
        type: 3
      }]
    }]
  }

  testEqual(result, expected)
}

function jsxChildArray () {
  const result = jsx('div', null, [jsx('div', null, 'foobar')])
  const expected = {
    tag: 'div',
    props: {},
    key: undefined,
    children: [{
      tag: 'div',
      props: {},
      key: undefined,
      children: [{
        tag: 'foobar',
        props: {},
        children: [],
        type: 3
      }]
    }]
  }

  testEqual(result, expected)
}

function jsxChildren () {
  const result = jsx('div', null, jsx('div', null, 'foobar'), jsx('div', null, 'foobar'), jsx('div', null, 'foobar'))
  const expected = {
    tag: 'div',
    props: {},
    key: undefined,
    children: [{
      tag: 'div',
      props: {},
      key: undefined,
      children: [{
        tag: 'foobar',
        props: {},
        children: [],
        type: 3
      }]
    }, {
      tag: 'div',
      props: {},
      key: undefined,
      children: [{
        tag: 'foobar',
        props: {},
        children: [],
        type: 3
      }]
    }, {
      tag: 'div',
      props: {},
      key: undefined,
      children: [{
        tag: 'foobar',
        props: {},
        children: [],
        type: 3
      }]
    }]
  }

  testEqual(result, expected)
}

function jsxChildrenArray () {
  const result = jsx('div', null, [jsx('div', null, 'foobar'), jsx('div', null, 'foobar'), jsx('div', null, 'foobar')])
  const expected = {
    tag: 'div',
    props: {},
    key: undefined,
    children: [{
      tag: 'div',
      props: {},
      key: undefined,
      children: [{
        tag: 'foobar',
        props: {},
        children: [],
        type: 3
      }]
    }, {
      tag: 'div',
      props: {},
      key: undefined,
      children: [{
        tag: 'foobar',
        props: {},
        children: [],
        type: 3
      }]
    }, {
      tag: 'div',
      props: {},
      key: undefined,
      children: [{
        tag: 'foobar',
        props: {},
        children: [],
        type: 3
      }]
    }]
  }

  testEqual(result, expected)
}

function staticSingle () {
  const result = jsxStatic('div', null, 'foobar')
  const expected = '<!-- xxx --><div>foobar</div>'

  testEqual(result, expected)
}

function staticChild () {
  const result = jsxStatic('div', null, jsxStatic('div', null, 'foobar'))
  const expected = '<!-- xxx --><div><div>foobar</div></div>'

  testEqual(result, expected)
}

function staticChildArray () {
  const result = jsxStatic('div', null, [jsxStatic('div', null, 'foobar')])
  const expected = '<!-- xxx --><div><div>foobar</div></div>'

  testEqual(result, expected)
}

function staticChildren () {
  const result = jsxStatic('div', null, jsxStatic('div', null, 'foobar'), jsxStatic('div', null, 'foobar'), jsxStatic('div', null, 'foobar'))
  const expected = '<!-- xxx --><div><div>foobar</div><div>foobar</div><div>foobar</div></div>'

  testEqual(result, expected)
}

function staticChildrenArray () {
  const result = jsxStatic('div', null, [jsxStatic('div', null, 'foobar'), jsxStatic('div', null, 'foobar'), jsxStatic('div', null, 'foobar')])
  const expected = '<!-- xxx --><div><div>foobar</div><div>foobar</div><div>foobar</div></div>'

  testEqual(result, expected)
}

export default function () {
  jsxSingle()

  jsxChild()
  jsxChildArray()

  jsxChildren()
  jsxChildrenArray()

  staticSingle()

  staticChild()
  staticChildArray()

  staticChildren()
  staticChildrenArray()
}


import { defineComponent } from '~/modules/pocket-superfine'
import cc from 'classcat'
import style from './_retodo.scss'

let interval = null

function Retodo (parentProps, children) {
  // Render is called every state update from the parent

  const options = {
    props: {
      ...parentProps
    },
    slots: {
      default: children
    }
  }

  return defineComponent(options, context => {
    // Setup is called when the component is created

    const state = context.reactive({
      count: 0,
      date: Date.now(),
      title: '',
      todos: [],
      errors: [],
      history: []
    })

    context.styles({
      default: style
    })

    function update (event) {
      state.title = event.target.value
    }

    function addTodo () {
      if (!state.title) {
        state.errors = [...state.errors, {
          message: 'A todo title is required'
        }]

        setTimeout(function setTimeoutHandler () {
          state.errors = state.errors.slice(0, -1)
        }, 3000)

        return // early exit
      }

      state.todos = [...state.todos, {
        title: state.title,
        created: Date.now(),
        checked: null,
        unchecked: Date.now(),
        scheduled: null
      }]

      state.title = ''
    }

    function pressEnter (event) {
      if (event.keyCode === 13) {
        addTodo()
      }
    }

    function toggleItem (created) {
      return function checkItemHandler () {
        const todos = state.todos
        const item = todos.find(item => item.created === created)

        if (item.checked) {
          item.checked = null
          item.unchecked = Date.now()
          item.scheduled = null
        } else {
          item.checked = Date.now()
          item.unchecked = null
          item.scheduled = Date.now() + 36000
        }

        state.todos = todos
      }
    }

    interval = setInterval(function setIntervalHandler () {
      const now = Date.now()
      state.date = now

      for (let index = 0; index < state.todos.length; index++) {
        const item = state.todos[index]

        if (item.scheduled < now) {
          item.checked = null
          item.unchecked = now
          item.scheduled = null
        }
      }
    }, 1000)

    return function render (props) {
      // Render is called every component state update

      // TODO: This sort can be optimized
      const todoList = [...state.todos]
        .sort((a, b) => a.checked - b.checked)
        .sort((a, b) => a.unchecked - b.unchecked)
        .sort((a, b) => b.checked ? -1 : 1)

      function getTimeUntil (item) {
        const timeUntil = item.scheduled - Date.now()

        const hours = Math.floor(timeUntil / 3600000)
        const minutes = Math.floor((timeUntil % 3600000) / 60000)
        const seconds = Math.floor((timeUntil % 60000) / 1000)

        return `${hours}h ${minutes}m ${seconds}s`
      }

      return <div class='retodo'>
        <div class='content'>
          <h1>Ret<span></span>d<span></span></h1>
          <h2>A smart reccuring todo list.</h2>
          {state.errors.map(function listErrors (error, index) {
            return <div class='error'>{error.message}</div>
          })}
          <div class='add-todo'>
            <input
              type='text'
              value={state.title}
              placeholder='Waiting for input...'
              oninput={update}
              onkeydown={pressEnter}
            />
            <button onclick={addTodo}>Add Todo</button>
          </div>
          {todoList.map(function listTodos (item, index) {
            return <label class='item'>
              <div>
                <div class={cc(['checkbox', item.checked && '-checked'])}></div>
                <input
                  type='checkbox'
                  onchange={toggleItem(item.created)}
                  checked={item.checked}
                  hidden
                />
                <span>{item.title}</span>
              </div>
              <div>
                {/* <span>median {item.timestamp}</span> */}
                {item.scheduled && <span>{getTimeUntil(item)}</span>}
              </div>
            </label>
          })}
        </div>
        <slot name='default'/>
      </div>
    }
  })
}
export default {
  setup (state, dispatch) {
    // Setup is called when the page is created

    return function render () {
      // Render is called every global state update

      return <Retodo/>
    }
  },
  destroy () {
    // Destroy is called when the page is destroyed

    clearInterval(interval)
  }
}

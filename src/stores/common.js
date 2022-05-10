
export default {
  state: {
    count: 0,
    sidebar: true
  },
  actions: {
    plus (state) {
      state.count++
      return state
    },
    minus (state) {
      state.count--
      return state
    },
    toggleSidebar (state) {
      state.sidebar = !state.sidebar
      return state
    }
  }
}

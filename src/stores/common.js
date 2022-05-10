
export default {
  state: {
    count: 0,
    sidebar: true
  },
  actions: {
    plus (state) {
      return { count: state.count + 1 }
    },
    minus (state) {
      return { count: state.count - 1 }
    },
    toggleSidebar (state) {
      return { sidebar: !state.sidebar }
    }
  }
}

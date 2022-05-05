
export default {
  state: {
    sidebar: true
  },
  actions: {
    toggleSidebar (state) {
      state.sidebar = !state.sidebar
    }
  }
}

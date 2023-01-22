
export default {
  state: {
    countOne: 0,
    countTwo: 0
  },
  actions: {
    plusOne (state) {
      state.countOne++
      return state
    },
    plusTwo (state) {
      state.countTwo++
      return state
    }
  },
  watch: (value, oldValue) => {
    console.log('xxx =>', value, oldValue)
  }
}

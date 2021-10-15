import UaParser from 'ua-parser-js'

export default {
  namespaced: true,
  state: {
    // User UA
    data: {}
  },
  mutations: {
    /**
     * @description 记录 UA
     * @param {Object} state state
     */
    get (state) {
      state.data = new UaParser().getResult()
    }
  }
}

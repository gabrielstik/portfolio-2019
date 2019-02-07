import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      fromRoute: null,
    },
    mutations: {
      updateRoute: function(state, fromRoute) {
        state.fromRoute = fromRoute
      }
    }
  })
}

export default createStore
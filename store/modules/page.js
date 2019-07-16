const state = {
  isSidebarOpen: false,
  isProductsOpen: false,
};

const getters = {
  isSidebarOpen: (state) => {
    return state.isSidebarOpen;
  },
  isProductsOpen: (state) => {
    return state.isProductsOpen;
  },
};

// actions
const actions = {
  setSidebarOpen({commit, state}, isOpen) {
    commit('setSidebarOpen', isOpen);
    if (isOpen) {
      commit('setProductsOpen', false)
    }
  },
  setProductsOpen({commit, state}, isOpen) {
    commit('setProductsOpen', isOpen)
    if (isOpen) {
      commit('setSidebarOpen', false)
    }
  },
}

// mutations
const mutations = {
  setSidebarOpen(state, isOpen) {
    state.isSidebarOpen = isOpen;
  },
  setProductsOpen(state, isOpen) {
    state.isProductsOpen = isOpen;
  },
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default {
  state: {
    toggleLoder: false,
  },
  getters: {
    getLoader(state) {
      return state.toggleLoder;
    },
  },
  mutations: {
    updateToggleLoder(state, status) {
      state.toggleLoder = status;
    },
  },
};

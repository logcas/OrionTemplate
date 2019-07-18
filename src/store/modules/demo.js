const state = {
  msg: 'This is demo store message'
};

const getters = {
  msgUpperCase: (state) => {
    let msg = state.msg;
    return msg.toUpperCase();
  }
};

const mutations = {
  setMsg: (state, newVal) => {
    state.msg = newVal;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};


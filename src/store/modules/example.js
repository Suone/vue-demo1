const state = {
    example: ''
};
const mutations = {
    SET_EXAMPLE(state, value) {
        state.example = value;
    }
};
const actions = {
    SET_EXAMPLE({ commit }, value) {
        commit('SET_EXAMPLE', value);
    }
};
export default {
    state,
    mutations,
    actions
};
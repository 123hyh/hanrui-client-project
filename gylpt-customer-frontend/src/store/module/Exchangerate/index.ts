import api from "@/api/interface.ts";
const state = {
  exchangerateList: [],
};
const mutations = {
  setExchangerateList(state: any, {data}: any) {
    state.exchangerateList = data;
  },
};
const actions = {
  async getExchangerateList({ commit }: any) {
    commit("setExchangerateList", await api.getExchangerate());
  },
};
const getters = {
  exchangerateList(state: any) {
    return state.exchangerateList;
  },
};
export default { state, mutations, actions, getters };

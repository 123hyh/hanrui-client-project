import api from "@/api/interface.ts";
const state = {
  menuList: [],
};
const mutations = {
  // tslint:disable-next-line:no-shadowed-variable
  setMenuList(state: any, { data = [] }: any): void {
    state.menuList = data;
  },
};
const actions = {
  async getMenu({ commit }: any) {
    commit("setMenuList", await api.getMenuList());
  },
};
const getters = {
  menuList(state: any) {
    return state.menuList;
  }
}
export default {
  state,
  mutations,
  actions,
  getters,
}
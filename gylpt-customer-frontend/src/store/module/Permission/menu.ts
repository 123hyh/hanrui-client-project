import api from "@/api/interface.ts";
import utools from '@/utils/uTools.ts';
const state = {
  menuList: [],
};
const mutations = {
  // tslint:disable-next-line:no-shadowed-variable
  setMenuList(state: any, { data = [] }: any): void {
    state.menuList = data;
  },
  // tslint:disable-next-line:no-shadowed-variable
  resetMenuList(state: any) {
    // tslint:disable-next-line:forin
    for (const key in state) {
      state[key] = utools.resetDataType(state[key]);
    }
  }
};
const actions = {
  async getMenu({ commit }: any) {
    commit('setMenuList', await api.getMenuList());
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
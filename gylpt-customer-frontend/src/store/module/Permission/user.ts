import utools from '@/utils/uTools.ts';
const state = {
  token: '',
  userName: '',
  userCode: '',
};
const mutations = {
  // tslint:disable-next-line:no-shadowed-variable
  setUser(state: any, { userName, token, userCode }: { userName: string, token: string, userCode: string }): void {
    state.userName = userName;
    state.token = token;
    state.userCode = userCode;
  },
  // tslint:disable-next-line:no-shadowed-variable
  resetSate(state: any) {
    // tslint:disable-next-line:forin
    for (const key in state) {
      state[key] = utools.resetDataType(state[key]);
    }
  }
};
const getters = {
  // tslint:disable-next-line: no-shadowed-variable
  token(state: any) {
    return state.token;
  },
  userCode(state: any) {
    return state.userCode;
  }
};
export default {
  state,
  mutations,
  getters,
};

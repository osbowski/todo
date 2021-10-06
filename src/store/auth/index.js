import actions from './actions';
import getters from './getters';
const auth = {
  namespaced:true,
  state: {
    userId: null,
    token: null,
    isLogged: false,
    authError:null
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
    },
  },
  actions,
  getters

};
export default auth
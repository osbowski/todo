export default {
  getAuthStatus(state) {
    return state.isLogged;
  },

  getAuthError(state) {
    return state.authError;
  },
  getUserId(state) {
    return state.userId;
  },
};

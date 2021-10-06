import router from "../../router";

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
  actions: {
    login(context, payload) {
      return context.dispatch("auth", {
        ...payload,
        mode: "login",
      });
    },
    tryLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (token && userId) {
        context.commit("setUser", {
          token,
          userId,
        });
        context.state.isLogged = true;
      }
    },
    signup(context, payload) {
      return context.dispatch("auth/auth", {
        ...payload,
        mode: "signup",
      });
    },

    async auth(context, payload) {
      context.state.authError= null;
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_GOOGLE_API_KEY}`;
      if (payload.mode === "signup") {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_GOOGLE_API_KEY}`;
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        context.state.authError = 'Authentication failed, check your login and password';
      }else{

        const expires = +responseData.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expires;
        localStorage.setItem("token", responseData.idToken);
        localStorage.setItem("userId", responseData.localId);
        localStorage.setItem("tokenExpiration", expirationDate);
  
        context.commit("setUser", {
          token: responseData.idToken,
          userId: responseData.localId,
        });
        context.state.isLogged = true;
        router.push('/')
      }


    },
    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenExpiration");

      context.commit("setUser", {
        token: null,
        userId: null,
      });
      context.state.isLogged = false;
      context.rootState.todos = [];
    },
    
  },
  modules: {},
  getters: {

    getAuthStatus(state) {
      return state.isLogged;
    },

    getAuthError(state){
      return state.authError;
    },
    getUserId(state){
      return state.userId;
    }
  },
};
export default auth
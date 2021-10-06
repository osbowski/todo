import { createStore } from "vuex";
import auth from './auth';
import actions from './actions';
import mutations from './mutations';

export default createStore({
  state: {
    todos: [],
  },
  modules: { auth },
  mutations,
  actions,
  getters: {
    getTodos(state) {
      return state.todos;
    },
  },
});

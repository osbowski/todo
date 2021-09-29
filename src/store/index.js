import { createStore } from "vuex";

export default createStore({
  state: {
    todos: [],
  },
  mutations: {
    addTodoToList(state, payload) {
      const existingElement = state.todos.find(
        (todo) => todo.id === payload.id
      );
      if (existingElement !== undefined) {
        const indexToChange = state.todos.findIndex(
          (todo) => todo.id === payload.id
        );
        state.todos[indexToChange] = payload;
      } else {
        state.todos.push(payload);
      }
    },
    removeTodoFromList(state, payload) {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
    },
  },
  actions: {
    async addTodoToList(context, payload) {
      await fetch(`https://osb-todo-default-rtdb.firebaseio.com/todos.json`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      context.commit("addTodoToList", payload);
    },
    removeTodoFromList(context, payload) {
      context.commit("removeTodoFromList", payload);
    },
  },
  modules: {},
  getters: {
    getTodos(state) {
      return state.todos;
    },
  },
});

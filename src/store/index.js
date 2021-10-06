import { createStore } from "vuex";
import auth from './auth';
export default createStore({
  state: {
    todos: [],
  },
  modules: { auth },
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
      const userId = context.rootGetters['auth/getUserId']
      if (payload.id === null) {
        const response = await fetch(
          `https://osb-todo-default-rtdb.firebaseio.com/todos/${userId}.json`,
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        );
        const responseData = await response.json();
        const todoData = {
          ...payload,
          id: responseData.name,
        };
        context.commit("addTodoToList", todoData);
      } else {
        await fetch(
          `https://osb-todo-default-rtdb.firebaseio.com/todos/${userId}/${payload.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(payload),
          }
        );
        context.commit("addTodoToList", payload);
      }
    },
    async removeTodoFromList(context, payload) {
      const userId = context.rootGetters['auth/getUserId']
      await fetch(
        `https://osb-todo-default-rtdb.firebaseio.com/todos/${userId}/${payload}.json`,
        {
          method: "DELETE",
        }
      );
      context.commit("removeTodoFromList", payload);
    },

    async getTodosFromDB(context) {
      const userId = context.rootGetters['auth/getUserId']
      const response = await fetch(
        `https://osb-todo-default-rtdb.firebaseio.com/todos/${userId}.json`
      );
      const todos = await response.json();
      for (let key in todos) {
        const todo = {
          id: key,
          ...todos[key],
        };
        context.commit("addTodoToList", todo);
      }
    },
  },

  getters: {
    getTodos(state) {
      return state.todos;
    },
  },
});

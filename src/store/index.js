import { createStore } from "vuex";

export default createStore({
  state: {
    todos: [],
    userId:null,
    token:null
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
    setUser(state,payload){
      state.userId = payload.useId;
      state.token = payload.token;
    }
  },
  actions: {
    login(context, payload) {
      return context.dispatch("auth", {
        ...payload,
        mode: "login",
      });
    },
    signup(context, payload) {
      return context.dispatch("auth", {
        ...payload,
        mode: "signup",
      });
    },

    async auth(context, payload) {
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCd6wnwZ6_0z_Mrrma0Qd2YIOx6TsG2KbQ`;
      if (payload.mode === "signup") {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCd6wnwZ6_0z_Mrrma0Qd2YIOx6TsG2KbQ`;
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
      const expires = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expires;
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("tokenExpiration", expirationDate);

      context.commit('setUser',{
        token:responseData.idToken,
        userId:responseData.localId
      })
    },
    logout(context){
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('tokenExpiration')

      context.commit('setUser',{
        token:null,
        userId:null
      })
      
    },
    async addTodoToList(context, payload) {
      if (payload.id === null) {
        const response = await fetch(
          `https://osb-todo-default-rtdb.firebaseio.com/todos.json`,
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
          `https://osb-todo-default-rtdb.firebaseio.com/todos/${payload.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(payload),
          }
        );
        context.commit("addTodoToList", payload);
      }
    },
    async removeTodoFromList(context, payload) {
      await fetch(
        `https://osb-todo-default-rtdb.firebaseio.com/todos/${payload}.json`,
        {
          method: "DELETE",
        }
      );
      context.commit("removeTodoFromList", payload);
    },

    async getTodosFromDB(context) {
      const response = await fetch(
        `https://osb-todo-default-rtdb.firebaseio.com/todos.json`
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
  modules: {},
  getters: {
    getTodos(state) {
      return state.todos;
    },
  },
});

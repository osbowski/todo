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
      // const existingKeys =await context.dispatch('getTodosKeysFromDB');
      // console.log(payload)
      // console.log(existingKeys);
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
      }else{
        await fetch(`https://osb-todo-default-rtdb.firebaseio.com/todos/${payload.id}.json`,{
          method:'PUT',
          body:JSON.stringify(payload)
        })
        context.commit("addTodoToList", payload)
      }
    },
    removeTodoFromList(context, payload) {
      context.commit("removeTodoFromList", payload);
    },

    // async getTodosKeysFromDB(){
    //   const response = await fetch(`https://osb-todo-default-rtdb.firebaseio.com/todos.json`)
    //   const responseData= await response.json();
    //   const keyArr = [];
    //   for (let key in responseData){
    //     keyArr.push(key)
    //   }
    //   return keyArr;
    // }
  },
  modules: {},
  getters: {
    getTodos(state) {
      return state.todos;
    },
  },
});

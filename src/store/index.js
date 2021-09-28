import { createStore } from 'vuex'

export default createStore({
  state: {
    todos:[]
  },
  mutations: {
    addTodoToList(state, payload){
      state.todos.push(payload)
    },
    removeTodoFromList(state,payload){
      state.todos = state.todos.filter(todo=> todo.id !== payload);
    }
  },
  actions: {
    addTodoToList(context,payload){
      context.commit('addTodoToList', payload)
    },
    removeTodoFromList(context,payload){
      context.commit('removeTodoFromList', payload)
    }
  },
  modules: {
  },
  getters:{
    getTodos(state){
      return state.todos;
    }
  }
})

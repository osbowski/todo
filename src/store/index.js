import { createStore } from 'vuex'

export default createStore({
  state: {
    todos:[
      // {
      //   id:1,
      //   body:"Test todo nr 1",
      //   deadline: '15.10.2021',
      //   createdAt: Date.now()
      // },
      // {
      //   id:2,
      //   body:"Test todo nr 2",
      //   deadline: '15.10.2021',
      //   createdAt: Date.now()
      // },
      // {
      //   id:3,
      //   body:"Test todo nr 3",
      //   deadline: '15.10.2021',
      //   createdAt: Date.now()
      // }
    ]
  },
  mutations: {
    addTodoToList(state, payload){
      state.todos.push(payload)
    }
  },
  actions: {
    addTodoToList(context,payload){
      context.commit('addTodoToList', payload)
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

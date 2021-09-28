import { createStore } from 'vuex'

export default createStore({
  state: {
    todos:[
      {
        id:1,
        body:"Test todo nr 1"
      },
      {
        id:2,
        body:"Test todo nr 2"
      },
      {
        id:3,
        body:"Test todo nr 3"
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters:{
    getTodos(state){
      return state.todos;
    }
  }
})

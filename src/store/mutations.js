export default {
  addTodoToList(state, payload) {
    const existingElement = state.todos.find((todo) => todo.id === payload.id);
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
};

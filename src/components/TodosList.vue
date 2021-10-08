<template>
  <ul>
    <h2>Yours todo</h2>
    <Todo
      v-for="todo in todos"
      :key="todo.id"
      :id="todo.id"
      :todoName="todo.todoName"
      :deadline="todo.deadline"
    />
  </ul>
</template>

<script>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

import Todo from "./Todo.vue";
export default {
  components: {
    Todo,
  },
  setup() {
    const store = useStore();
    const todos = computed(() => store.getters.getTodos);

    onBeforeMount(() => store.dispatch("getTodosFromDB"));

    return {
      todos,
    };
  },
};
</script>
<style scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  margin-bottom: 2rem;
}
</style>

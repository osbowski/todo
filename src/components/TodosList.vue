<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <p>{{ todo.body }}</p>
      <p>Dedline: {{todo.deadline}}</p>
      <button>Done!</button>
      <button>Edit</button>
    </li>
  </ul>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const todos = computed(() => store.getters.getTodos);

    return {
      todos,
    };
  },
};
</script>

<style scoped>
li {
  padding: 0.5rem;
  margin: 0.5rem;
}
</style>

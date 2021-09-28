<template>
<ul>
    <li v-for="todo in todos" :key="todo.id">
        <p>{{todo.body}}</p>
    </li>
</ul>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
      const store = useStore();
      const todos = computed(()=>store.getters.getTodos);

      return{
          todos
      }
  },
};
</script>

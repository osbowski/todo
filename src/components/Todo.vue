<template>
  <li>
    <p>{{ todoName }}</p>
    <p>Dedline: {{ deadlineDate }}</p>
    <p>{{ id }}</p>
    <button @click="onDeleteTodo">Done!</button>
    <button>Edit</button>
  </li>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["todoName", "deadline", "id"],
  setup(props) {
    const store = useStore();
    const deadlineDate = computed(() => {
      return new Date(props.deadline).toLocaleDateString();
    });

    const onDeleteTodo = () => {
      store.dispatch("removeTodoFromList", props.id);
    };
    return {
      deadlineDate,
      onDeleteTodo,
    };
  },
};
</script>

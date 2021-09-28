<template>
  <form>
    <input type="text" placeholder="To do" v-model="todoName" />
    <label for="deadline">Deadline for this:</label>
    <input type="date" name="deadline" v-model="deadline" />
    <button @click.prevent="onAddTodo">Add to list</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const todoName = ref("");
    const deadline = ref(null);

    const onAddTodo = () => {
      const todo = {
        id: Math.floor(Math.random()*10410941209412),
        todoName: todoName.value,
        deadline: Date.parse(deadline.value),
        createdAd: Date.now(),
      };
      console.log(todo);
      store.dispatch("addTodoToList", todo);
    };

    return {
      todoName,
      deadline,
      onAddTodo,
    };
  },
};
</script>

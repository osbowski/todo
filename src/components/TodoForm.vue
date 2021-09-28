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
export default {
  setup() {
    const todoName = ref("");
    const deadline = ref(null);

    const onAddTodo = ()=>{
        const todo = {
            todoName:todoName.value,
            deadline:Date.parse(deadline.value),
            createdAd:Date.now()
        }
        console.log(todo)
    }

    return {
      todoName,
      deadline,
      onAddTodo
    };
  },
};
</script>

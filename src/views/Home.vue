<template>
  <div class="home">
    <va-card :bordered="false">
      <TodoForm />
    </va-card>

    <TodosList />
  </div>
</template>

<script>
import TodosList from "../components/TodosList.vue";
import TodoForm from "../components/TodoForm.vue";
export default {
  name: "Home",
  components: {
    TodosList,
    TodoForm,
  },
};
</script>

<style scoped>
.va-card {
  width: 75%;
  margin: 0 auto;
  padding: 0.1rem 0;
  margin-bottom: 2rem;
}
</style>

<template>
  <div class="home">
    <TodoForm />
    <TodosList />
  </div>
</template>

<script>
import TodosList from '../components/TodosList.vue';
import TodoForm from '../components/TodoForm.vue';
export default {
  name: 'Home',
  components:{
    TodosList,
    TodoForm,
  }
}
</script>

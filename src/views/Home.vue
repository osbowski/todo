<template>
  <div class="home">
    <h1>Hello vue</h1>
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

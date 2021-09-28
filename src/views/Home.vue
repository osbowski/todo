<template>
  <div class="home">
    <h1>Hello vue</h1>
    <TodosList />
  </div>
</template>

<script>
import TodosList from '../components/TodosList.vue'
export default {
  name: 'Home',
  components:{
    TodosList,
  }
}
</script>

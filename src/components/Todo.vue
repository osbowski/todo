<template>
  <li>
    <p>{{ todoName }}</p>
    <p>Dedline: {{ deadlineDate }}</p>
    <button>Done!</button>
    <button>Edit</button>
  </li>
</template>

<script>
import{computed} from 'vue';
export default {
    props:['todoName', 'deadline', 'id'],
    setup(props) {
      const deadlineDate = computed(()=>{
        return new Date(props.deadline).toLocaleDateString()
      })


      return{
        deadlineDate,
      }
    },
}
</script>

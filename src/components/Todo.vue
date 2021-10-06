<template>
  <li :class="{timeAlert:timeAlert}">
    <BaseDialog title="Edit todo" :show="isOpen" @close="closeDialog">
      <TodoForm :nameInEdit="todoName" :idInEdit="id" :deadlineDateInEdit="deadline" @close="closeDialog" />
    </BaseDialog>
    <p v-if="timeAlert">Hurry up with this!</p>
    <p>{{ todoName }}</p>
    <p>Dedline: {{ deadlineDate }}</p>
    <p>Days left : {{timeToEnd}}</p>
    <button @click="onDeleteTodo">Done!</button>
    <button @click ="openDialog">Edit</button>
  </li>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import BaseDialog from "./UI/BaseDialog.vue";
import TodoForm from "./TodoForm.vue";

export default {
  components: {
    BaseDialog,
    TodoForm,
  },
  props: ["todoName", "deadline", "id"],
  setup(props) {
    const store = useStore();
    // const daysToEnd = ref(null);

    const isOpen = ref(false);
    const deadlineDate = computed(() => {
      return new Date(props.deadline).toLocaleDateString();
    });

    const timeToEnd = computed(()=>{
      const now = new Date().getTime()
      const deadline = new Date(props.deadline).getTime()
      return Math.round((deadline-now)/(1000*60*60*24));
      
    });

    const timeAlert = computed(()=>timeToEnd.value <=1 ? true : false);

    const onDeleteTodo = () => {
      store.dispatch("removeTodoFromList", props.id);
    };

    const openDialog = ()=>{
      isOpen.value = true;
    }
    const closeDialog = ()=>{
      isOpen.value = false;
    }

    return {
      isOpen,
      deadlineDate,
      timeToEnd,
      timeAlert,
      onDeleteTodo,
      openDialog,
      closeDialog
    };
  },
};
</script>

<style scoped>
.timeAlert{
  border:1px solid red;
}
</style>
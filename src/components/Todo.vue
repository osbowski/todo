<template>
  <li>
    <BaseDialog title="Edit todo" :show="isOpen" @close="closeDialog">
      <TodoForm :nameInEdit="todoName" :idInEdit="id" :deadlineDateInEdit="deadline" />
    </BaseDialog>
    <p>{{ todoName }}</p>
    <p>Dedline: {{ deadlineDate }}</p>
    <p>{{ id }}</p>
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

    const isOpen = ref(false);
    const deadlineDate = computed(() => {
      return new Date(props.deadline).toLocaleDateString();
    });

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
      onDeleteTodo,
      openDialog,
      closeDialog,
    };
  },
};
</script>

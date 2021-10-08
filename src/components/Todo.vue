<template>
  <li>
    <BaseDialog title="Edit todo" :show="isOpen" @close="closeDialog">
      <TodoForm
        :nameInEdit="todoName"
        :idInEdit="id"
        :deadlineDateInEdit="deadline"
        @close="closeDialog"
      />
    </BaseDialog>
    <va-card
      :bordered="false"
      stripe-color="#ff0000"
      v-bind="{ stripe: timeAlert }"
      class="mb-2"
    >
      <va-card-title>
        <p>Dedline: {{ deadlineDate }}</p>
        <p :class="{ timeAlert: timeAlert }">Days left : {{ timeToEnd }}</p>
      </va-card-title>
      <va-card-content>
        <p>{{ todoName }}</p>
      </va-card-content>
      <va-card-content>
        <va-button
          outline
          color="#100C08"
          :rounded="false"
          @click="onDeleteTodo"
          class="mr-1"
          >Done!</va-button
        >
        <va-button
          outline
          color="#100C08"
          :rounded="false"
          @click="openDialog"
          class="ml-1"
          >Edit</va-button
        >
      </va-card-content>
    </va-card>
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

    const timeToEnd = computed(() => {
      const now = new Date().getTime();
      const deadline = new Date(props.deadline).getTime();
      return Math.round((deadline - now) / (1000 * 60 * 60 * 24));
    });

    const timeAlert = computed(() => (timeToEnd.value <= 1 ? true : false));

    const onDeleteTodo = () => {
      store.dispatch("removeTodoFromList", props.id);
    };

    const openDialog = () => {
      isOpen.value = true;
    };
    const closeDialog = () => {
      isOpen.value = false;
    };

    return {
      isOpen,
      deadlineDate,
      timeToEnd,
      timeAlert,
      onDeleteTodo,
      openDialog,
      closeDialog,
    };
  },
};
</script>

<style scoped>
.timeAlert {
  color: #e42024;
}
.va-card {
  padding: 0.1rem 0;
}
.va-card--outlined {
  border-color: #100c08;
}
.va-card__title {
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.7rem;
}

.va-card__content {
  font-size: 1.2rem;
}

li {
  width: 75%;
  margin-bottom: 2rem;
}
</style>

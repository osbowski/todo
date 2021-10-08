<template>
  <h2>Add new todo</h2>
  <va-form class="mb-4 mt-4">
    <div class="row justify--center">
      <div>
        <va-input color="#000" type="text" label="Todo" v-model="todoName" />
      </div>
      <div>
        <va-input
          label="Deadline"
          color="#000"
          type="date"
          name="deadline"
          v-model="deadline"
        />
      </div>
    </div>
    <va-button
      outline
      :rounded="false"
      color="#000"
      @click.prevent="onAddTodo"
      :class="{ editButton: !!id }"
      class="mt-4"
      >{{ buttonCaption }}</va-button
    >
  </va-form>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  props: ["nameInEdit", "deadlineDateInEdit", "idInEdit"],
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();

    const todoName = ref("");
    const deadline = ref(null);
    const id = ref(null);
    const buttonCaption = ref("Add to list");

    const closeAfterAddTodo = () => {
      emit("close");
    };

    const onAddTodo = () => {
      const todo = {
        id: id.value,
        todoName: todoName.value,
        deadline: deadline.value,
        createdAd: Date.now(),
      };
      store.dispatch("addTodoToList", todo);
      todoName.value = "";
      deadline.value = null;
      id.value = null;
      closeAfterAddTodo();
    };

    onMounted(() => {
      if (props.idInEdit !== undefined) {
        buttonCaption.value = "Edit todo";
        todoName.value = props.nameInEdit;
        deadline.value = props.deadlineDateInEdit;
        id.value = props.idInEdit;
      }
    });

    return {
      todoName,
      deadline,
      onAddTodo,
      buttonCaption,
      id,
    };
  },
};
</script>

<style scoped>
h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.row {
  column-gap: 1rem;
  row-gap: 1rem;
}
.va-input {
  width: 226px;
}
.editButton {
  float: right;
  margin: 1rem 0;
}
</style>

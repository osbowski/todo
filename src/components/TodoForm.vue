<template>
  <h2>Add new todo</h2>
  <va-form class="mb-4 mt-2">
    <div class="row justify--center mb-2">
      <div>
        <va-input
          color="#000"
          type="text"
          placeholder="To do"
          v-model="todoName"
        />
      </div>
      <div>
        <va-input color="#000" type="date" name="deadline" v-model="deadline" />
      </div>
    </div>
    <va-button outline color="#000" @click.prevent="onAddTodo">{{
      buttonCaption
    }}</va-button>
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
        // id: id.value ? id.value : Math.floor(Math.random()*10410941209412),
        id: id.value,
        todoName: todoName.value,
        // deadline: Date.parse(deadline.value),
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
    };
  },
};
</script>

<style scoped>
h2{
  font-size:2rem;
}
.va-form {
  margin: 0 auto;
}
.row {
  column-gap: 1rem;
  row-gap: 1rem;
}
.va-input {
  width: 226px;
}
</style>

<template>
  <form>
    <input type="text" placeholder="To do" v-model="todoName" />
    <label for="deadline">Deadline for this:</label>
    <input type="date" name="deadline" v-model="deadline" />
    <button @click.prevent="onAddTodo">{{ buttonCaption }}</button>
  </form>
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

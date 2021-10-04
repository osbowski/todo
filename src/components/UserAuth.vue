<template>
  <form @submit.prevent="submitAuthForm">
    <div>
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        autocomplete="username"
        v-model.trim="email"
      />
    </div>
    <div>
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        autocomplete="current-password"
        v-model.trim="password"
      />
    </div>
    <p v-if="!formIsValid">
      Please enter a valid email and password(must be at least 6 characters).
    </p>
    <button>{{ submitButtonCaption }}</button>
    <button type="button" @click="switchAuthMode">
      {{ switchModeButtonCaption }}
    </button>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const email = ref("");
    const password = ref("");
    const mode = ref("login");
    const formIsValid = ref(true);

    const submitButtonCaption = computed(() =>
      mode.value === "login" ? "Login" : "Singup"
    );
    const switchModeButtonCaption = computed(() =>
      mode.value === "login" ? "or Sing up" : "or Log in"
    );

    const switchAuthMode = () => {
      mode.value = mode.value === "login" ? "signup" : "login";
    };

    const submitAuthForm = () => {
      formIsValid.value = true;
      if (
        email.value === "" ||
        !email.value.includes("@") ||
        password.value.length < 6
      ) {
        formIsValid.value = false;
        setTimeout(()=>formIsValid.value=true,3000)
        return;
      }
      const user = {
        email: email.value,
        password: password.value,
      };
      if (mode.value === "login") {
        store.dispatch("login", user);
      } else {
        store.dispatch("signup", user);
      }
    };

    const changeValidation = ()=>formIsValid.value = true;

    return {
      email,
      password,
      mode,
      submitButtonCaption,
      switchModeButtonCaption,
      formIsValid,
      switchAuthMode,
      submitAuthForm,
      changeValidation
    };
  },
};
</script>

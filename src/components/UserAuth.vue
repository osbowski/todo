<template>
  <va-form class="flex xs8 md6" @submit.prevent="submitAuthForm">
    <div class="mb-4">
      <va-input
        type="email"
        id="email"
        label="Email"
        autocomplete="username"
        v-model.trim="email"
        bordered
        color="#000"
      />
    </div>
    <div>
      <va-input
        type="password"
        id="password"
        label="Password"
        autocomplete="current-password"
        v-model.trim="password"
        bordered
        color="#000"
      />
    </div>
    <p v-if="!formIsValid">
      Please enter a valid email and password(must be at least 6 characters).
    </p>
    <p v-if="authError">{{ authError }}</p>
    <div class="mt-4">
      <va-button outline color="#000" class="mr-4" @click="submitAuthForm">{{ submitButtonCaption }}</va-button>
      <va-button flat color="#000" type="button" @click="switchAuthMode">
        {{ switchModeButtonCaption }}
      </va-button>
    </div>
  </va-form>
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
    const errorMessage = ref(null);

    const submitButtonCaption = computed(() =>
      mode.value === "login" ? "Login" : "Singup"
    );
    const switchModeButtonCaption = computed(() =>
      mode.value === "login" ? "or Sing up" : "or Log in"
    );

    const authError = computed(() => store.getters["auth/getAuthError"]);

    const switchAuthMode = () => {
      mode.value = mode.value === "login" ? "signup" : "login";
    };

    const submitAuthForm = async () => {
      formIsValid.value = true;
      if (
        email.value === "" ||
        !email.value.includes("@") ||
        password.value.length < 6
      ) {
        formIsValid.value = false;
        setTimeout(() => (formIsValid.value = true), 3000);
        return;
      }
      const user = {
        email: email.value,
        password: password.value,
      };

      try {
        if (mode.value === "login") {
          await store.dispatch("auth/login", user);
        } else {
          await store.dispatch("auth/signup", user);
        }
      } catch (error) {
        errorMessage.value = error;
      }
    };

    const changeValidation = () => (formIsValid.value = true);

    return {
      email,
      password,
      mode,
      submitButtonCaption,
      switchModeButtonCaption,
      formIsValid,
      authError,
      switchAuthMode,
      submitAuthForm,
      changeValidation,
    };
  },
};
</script>

<style scoped>
.va-form{
  margin: 0 auto;
}
</style>

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
      <button>{{submitButtonCaption}}</button>
      <button type="button" @click="switchAuthMode">{{switchModeButtonCaption}}</button>
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

    const submitButtonCaption = computed(()=> mode.value === 'login' ? 'Login' : 'Singup');
    const switchModeButtonCaption = computed(()=> mode.value === 'login' ? 'or Sing up' : 'or Log in');

    const switchAuthMode = ()=> {
        mode.value = mode.value==='login' ? 'signup' : 'login'
    };

    const submitAuthForm = () => {
      const user = {
        email: email.value,
        password: password.value,
      };
      if(mode.value === 'login'){
           store.dispatch("login", user);
      }else{
           store.dispatch("signup", user);
      }
    };

    return {
      email,
      password,
      mode,
      submitButtonCaption,
      switchModeButtonCaption,
      switchAuthMode,
      submitAuthForm,
    };
  },
};
</script>

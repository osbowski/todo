<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/auth">Login</router-link>
    <button v-if="isLogged" @click="logout">Logout</button>
  </div>
  <router-view />
</template>

<script>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLogged = computed(() => store.getters['auth/getAuthStatus']);
    const logout = () => {
      store.dispatch("auth/logout");
      router.push("/auth");
    };
    onBeforeMount(() => {
      store.dispatch("auth/tryLogin");
    });
    return {
      isLogged,
      logout,
    };
  },
};
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

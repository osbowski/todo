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
import {useRouter} from 'vue-router';
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLogged = computed(() => store.getters.getAuthStatus);
    const logout = ()=>{
      store.dispatch("logout");
      router.push('/auth')
      
    }
    onBeforeMount(()=>{
      store.dispatch('tryLogin')
    })
    return {
      isLogged,
      logout
    };
  },
};
</script>

<style>
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  font-weight: normal;
  margin: 0;
  padding: 0;
}

ol,
ul {
  list-style: none;
}

img {
  height: auto;
  max-width: 100%;
}
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

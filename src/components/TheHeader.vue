<template>
  <va-navbar color="#100C08" class="mb-5">
    <template #left>
      <va-navbar-item>TodoApp</va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>
        <va-button
          outline
          color="#fff"
          :rounded="false"
          v-if="isLogged"
          @click="logout"
          >Logout</va-button
        >
      </va-navbar-item>
    </template>
  </va-navbar>
</template>

<script>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "TheHeader",

  setup() {
    const store = useStore();
    const router = useRouter();

    const isLogged = computed(() => store.getters["auth/getAuthStatus"]);
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

<style scoped>
.va-navbar {
  padding: 1rem 12%;
}
</style>

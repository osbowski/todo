<template>
    <form @submit.prevent="login">
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" autocomplete="username" v-model="email">
        </div>
        <div>
            <label for="password">Password</label>
            <input id="password" type="password" autocomplete="current-password" v-model="password">
        </div>
        <div>
            <button>Login</button>
            <button>Sign up</button>
        </div>
    </form>
</template>

<script>
import {ref} from 'vue';
export default {
    setup() {
        const email = ref('');
        const password = ref('');

        const login = ()=>{
            const user = {
                email:email.value,
                password:password.value
            }
            console.log('USER:',user)
        }

        return{
            email,
            password,
            login
        }
    },
}
</script>
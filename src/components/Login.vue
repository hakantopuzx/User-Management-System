<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from '../api/axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const login = async () => {
    try {
        const response = await axios.post('/login', { email: email.value, password: password.value })
        const token = response.data.token
        localStorage.setItem('token', token)
        store.commit('setLoggedIn', true)
        router.push('/')
    } catch (error) {
        toast.error("Kullanıcı Adı veya Şifre Hatalı");
    }
}
</script>

<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
        <div class="register-link">
            <p>Don't have an account? <router-link to="/register">Register</router-link></p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.login {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;


    form div {
        margin-bottom: 10px;

        label {
            text-align: left;
            display: block;
            margin-bottom: 5px;
            color: #fff;
        }

        input,
        select {
            width: -webkit-fill-available;
            background: rgb(196, 196, 196);
            border-radius: 4px;
            border: none;
            padding: 12px;
            font-size: 18px;
            font-weight: 500;
            color: #000;
        }
    }

    button {
        width: 100%;
        padding: 16px;
        background-color: #42b983;
        color: white;
        border: none;
        cursor: pointer;
        margin-top: 16px;
        font-size: 20px;
    }

    .register-link {
        margin-top: 15px;
        color: gray;
        text-align: center;
    }

    h2 {
        font-size: 32px;
        color: #fff;
    }
}
</style>
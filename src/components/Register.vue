<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from '../api/axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const store = useStore()
const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')

const register = async () => {
    try {
        const response = await axios.post('/register', {
            name: fullName.value,
            email: email.value,
            password: password.value,
            role: 'User'
        })
        const token = response.data.token
        localStorage.setItem('token', token)
        store.commit('setLoggedIn', true)
        router.push('/')
    } catch (error) {
        toast.error(error);
    }
}
</script>

<template>
    <div class="register">
        <h2>Register</h2>
        <form @submit.prevent="register">
            <div>
                <label for="fullName">Full Name:</label>
                <input type="text" id="fullName" v-model="fullName" required>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">Register</button>
        </form>
        <div class="login-link">
            <p>Already have an account? <router-link to="/login">Login</router-link></p>
        </div>
    </div>
</template>
<style scoped lang="scss">
.register {
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

    .login-link {
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
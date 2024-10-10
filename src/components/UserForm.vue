<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import axios from '/src/api/axios'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const store = useStore()
const router = useRouter()
const route = useRoute()

const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required'),
    role: yup.string().required('Role is required').oneOf(['Admin', 'User'], 'Invalid role')
})

const { handleSubmit, resetForm } = useForm({
    validationSchema: schema
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: role, errorMessage: roleError } = useField('role')

const isEditing = ref(false)
const userId = ref('')

const fetchUser = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`)
        const user = response.data
        name.value = user.name
        email.value = user.email
        password.value = user.password
        role.value = user.role
    } catch (error) {
        console.error('Error fetching user:', error)
    }
}

const onSubmit = handleSubmit(async (values) => {
    try {
        if (isEditing.value) {
            await axios.put(`http://localhost:3000/api/users/${userId.value}`, values)
            store.commit('updateUser', { id: userId.value, ...values })
        } else {
            const response = await axios.post('http://localhost:3000/api/users', values)
            store.commit('addUser', response.data)
        }
        router.push('/users')
        toast.success('User saved successfully');
    } catch (error) {
        toast.success('Error saving user:', error);
    }
})

onMounted(() => {
    if (!store.state.loggedIn) {
        router.push('/login')
    } else if (route.params.id) {
        isEditing.value = true
        userId.value = route.params.id as string
        fetchUser(userId.value)
    }
})
</script>

<template>
    <div class="user-form">
        <h2>{{ isEditing ? 'Edit User' : 'Add New User' }}</h2>
        <form @submit="onSubmit">
            <div>
                <label for="name">Name:</label>
                <input id="name" v-model="name" type="text">
                <span class="error">{{ nameError }}</span>
            </div>
            <div>
                <label for="email">Email:</label>
                <input id="email" v-model="email" type="email">
                <span class="error">{{ emailError }}</span>
            </div>
            <div>
                <label for="password">Password:</label>
                <input id="password" v-model="password" type="text">
                <span class="error">{{ passwordError }}</span>
            </div>
            <div>
                <label for="role">Role:</label>
                <select id="role" v-model="role">
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <span class="error">{{ roleError }}</span>
            </div>
            <button type="submit">{{ isEditing ? 'Update' : 'Add' }} User</button>
        </form>
    </div>
</template>

<style scoped>
.user-form {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
}

form div {
    margin-bottom: 15px;
}

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
    padding: 16px 0;
    font-size: 18px;
    font-weight: 500;
    color: #000;
}

input {
    padding: 16px;
}

.error {
    color: red;
    font-size: 0.8em;
}

button {
    width: 100%;
    padding: 16px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 16px;
}

h2 {
    font-size: 36px;
    color: #fff;
}
</style>
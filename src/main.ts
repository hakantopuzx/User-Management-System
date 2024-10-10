import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import UserList from './components/UserList.vue'
import UserForm from './components/UserForm.vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const store = createStore({
    state() {
        return {
            users: [],
            loggedIn: !!localStorage.getItem('token')
        }
    },
    mutations: {
        setUsers(state: { users: any[], loggedIn: boolean }, users: any[]) {
            state.users = users
        },
        addUser(state: { users: any[], loggedIn: boolean }, user: any) {
            state.users.push(user)
        },
        updateUser(state: { users: any[] }, updatedUser: { id: any }) {
            const index = state.users.findIndex(user => user._id === updatedUser.id)
            if (index !== -1) {
                state.users.splice(index, 1, updatedUser)
            }
        },
        deleteUser(state: { users: any[] }, userId: any) {
            state.users = state.users.filter(user => user._id !== userId)
        },
        setLoggedIn(state: { loggedIn: any }, value: any) {
            state.loggedIn = value
        }
    }
})

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/users', component: UserList },
    { path: '/users/new', component: UserForm },
    { path: '/users/:id/edit', component: UserForm, props: true }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
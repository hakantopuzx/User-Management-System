<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const logout = () => {
    localStorage.removeItem('token')
    store.commit('setLoggedIn', false)
    router.push('/login')
}
</script>

<template>
    <div id="app">
        <nav v-if="store.state.loggedIn">
            <router-link to="/">Home</router-link> |
            <router-link to="/users">Users</router-link> |
            <a @click="logout">Logout</a>
        </nav>
        <router-view></router-view>
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;
}

nav a {
    font-size: 18px;
    font-weight: bold;
    color: #67829c;
    cursor: pointer;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
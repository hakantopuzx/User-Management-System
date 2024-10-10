<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const store = useStore()
const router = useRouter()

onMounted(() => {
    if (!store.state.loggedIn) {
        router.push('/login')
    }
})
</script>

<template>
    <div class="home">
        <h1>Welcome to User Management System</h1>
        <p>This system allows you to manage users efficiently.</p>
    </div>
</template>


<style scoped>
h1,
p {
    color: #fff;
}

@media (max-width: 768px) {

    h1 {
        font-size: 24px;
    }
}
</style>
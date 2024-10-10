<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from '/src/api/axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const store = useStore()
const router = useRouter()
const searchTerm = ref('')


const token = localStorage.getItem('token');
const tokenParts = token.split('.');
const payloadBase64 = tokenParts[1];
const payload = JSON.parse(atob(payloadBase64));
const loggedInUserId = payload.userId;

const fetchUsers = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/users')
        store.commit('setUsers', response.data)
    } catch (error) {
        console.error('Error fetching users:', error)
    }
}

const deleteUser = async (userId: string) => {
    try {
        await axios.delete(`http://localhost:3000/api/users/${userId}`)
        store.commit('deleteUser', userId)
        toast.success('User deleted successfully');
    } catch (error) {
        toast.error('User deleted successfully');
    }
}

const filteredUsers = computed(() => {
    return store.state.users?.filter(user => {
        const nameMatch = user.name?.toLowerCase().includes(searchTerm.value.toLowerCase());
        const emailMatch = user.email?.toLowerCase().includes(searchTerm.value.toLowerCase());
        return nameMatch || emailMatch;
    }) || [];
});

onMounted(() => {
    if (!store.state.loggedIn) {
        router.push('/login')
    } else {
        fetchUsers()
    }
})
</script>

<template>
    <div class="user-list">
        <h2>User List</h2>
        <div class="search">
            <input v-model="searchTerm" placeholder="Search by name or email">
        </div>
        <div class="list">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers" :key="user._id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role }}</td>
                        <td class="act">
                            <button @click="router.push(`/users/${user._id}/edit`)">Edit</button>
                            <button v-if="user._id !== loggedInUserId" @click="deleteUser(user._id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button class="btn-add-user" @click="router.push('/users/new')">Add New User</button>
    </div>
</template>

<style scoped lang="scss">
.user-list {
    max-width: 960px;
    width: 100%;
    margin: 0 auto;

    .search {
        width: 100%;
        margin-bottom: 40px;

        input {
            width: 50%;
            padding: 12px;
            font-size: 16px;
        }
    }

    .list {
        width: 100%;
        overflow: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;

        th,
        td {
            border: 1px solid #ddd;
            padding: 16px;
            text-align: left;
            color: #fff;
        }

        th {
            background-color: #b4abab;
            color: #000;
        }

        .act {
            display: flex;
            gap: 20px;
        }
    }

    .btn-add-user {
        width: 100%;
        margin-top: 30px;
        padding: 16px;
    }

    h2 {
        font-size: 32px;
        color: #fff;
    }
}

@media (max-width: 768px) {
    .user-list {
        .search {
            margin-bottom: 12px;
            input {
                width: 90%;
            }
        }
    }
}
</style>
<template>
  <div id="app">
    <nav>
      <router-link to="/login">Login</router-link> | 
      <router-link to="/register">Register</router-link> | 
      <router-link to="/profile" v-if="authStore.isAuthenticated">Profile</router-link>
      <button @click="handleLogout" v-if="authStore.isAuthenticated">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useAuthStore from './store/auth';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style>
nav {
  padding: 20px;
  background-color: #f0f0f0;
  text-align: center;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
}
nav a.router-link-exact-active {
  color: #42b983;
}
button {
  margin-left: 15px;
}
</style>

<template>
  <div>
    <h1>Profile</h1>
    <div v-if="authStore.user">
      <p><strong>Name:</strong> {{ authStore.user.name }}</p>
      <p><strong>Email:</strong> {{ authStore.user.email }}</p>
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import useAuthStore from '../store/auth.js';

const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.user) {
    authStore.fetchProfile();
  }
});
</script>

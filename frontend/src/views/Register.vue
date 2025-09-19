<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '../store/auth.js';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleRegister = async () => {
  try {
    await authStore.register({ name: name.value, email: email.value, password: password.value });
    router.push('/login');
  } catch (error) {
    console.error('Erro no registro:', error);
    alert('Erro ao registrar. Verifique os dados e tente novamente.');
  }
};
</script>

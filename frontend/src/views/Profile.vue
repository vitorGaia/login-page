<template>
  <div class="min-h-screen w-screen flex items-center justify-center bg-gray-900 text-gray-100">
    <div class="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
      <h1 class="text-3xl font-bold text-center mb-6 text-cyan-400">Perfil</h1>

      <div v-if="authStore.user" class="space-y-4">
        <p>
          <span class="font-semibold text-cyan-400">Nome:</span>
          {{ authStore.user.name }}
        </p>
        <p>
          <span class="font-semibold text-cyan-400">E-mail:</span>
          {{ authStore.user.email }}
        </p>
      </div>

      <div v-else class="text-gray-400 text-center">
        <p>Carregando dados do usuário...</p>
      </div>

      <div class="mt-6">
        <button
          @click="handleLogout"
          v-if="authStore.isAuthenticated"
          class="w-full px-4 py-2 text-lg font-semibold text-gray-900 bg-cyan-400 rounded-lg shadow-md hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
        >
          Sair
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import useAuthStore from '../store/auth.js';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

onMounted(() => {
  if (!authStore.user) {
    authStore.fetchProfile();
  }
});
</script>

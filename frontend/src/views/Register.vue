<template>
  <div class="min-h-screen w-screen flex items-center justify-center bg-gray-900 text-gray-100">
    <div class="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
      <h2 class="text-3xl font-bold text-center mb-6 text-cyan-400">Cadastro</h2>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-300">Nome</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            class="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Digite seu nome"
          />
        </div>

        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-300">E-mail</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Digite seu e-mail"
          />
        </div>

        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-300">Senha</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Digite sua senha"
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full px-4 py-2 text-lg font-semibold text-gray-900 bg-cyan-400 rounded-lg shadow-md hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
          >
            Cadastrar
          </button>
        </div>

        <div class="text-center text-sm text-gray-400">
          <p>
            Já tem uma conta?
            <router-link to="/login" class="text-cyan-400 hover:underline">
              Entrar
            </router-link>
          </p>
        </div>
      </form>
    </div>
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

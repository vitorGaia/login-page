import { defineStore } from 'pinia';
import authService from '../services/authService';

const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
    error: null, // New error state
  }),
  actions: {
    setError(message) {
      this.error = message;
    },
    clearError() {
      this.error = null;
    },
    async login(credentials) {
      this.clearError(); // Clear previous errors
      try {
        const response = await authService.login(credentials);
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        this.isAuthenticated = true;
        await this.fetchProfile();
      } catch (error) {
        this.setError(error.response?.data?.message || 'E-mail ou senha inválidos.');
        throw error; // Re-throw to allow components to handle navigation etc.
      }
    },
    async register(userData) {
      this.clearError(); // Clear previous errors
      try {
        await authService.register(userData);
      } catch (error) {
        this.setError(error.response?.data?.message || 'Erro ao registrar. Verifique os dados e tente novamente.');
        throw error; // Re-throw to allow components to handle navigation etc.
      }
    },
    async fetchProfile() {
      if (this.token) {
        try {
          const response = await authService.fetchProfile(this.token);
          this.user = response.data;
        } catch (error) {
          this.setError('Falha ao carregar perfil. Por favor, faça login novamente.');
          this.logout(); // Log out if profile fetch fails
          throw error;
        }
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      this.clearError(); // Clear errors on logout
    },
  },
});

export default useAuthStore;

import { defineStore } from 'pinia';
import authService from '../services/authService';

const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  actions: {
    async login(credentials) {
      const response = await authService.login(credentials);
      this.token = response.data.token;
      localStorage.setItem('token', this.token);
      this.isAuthenticated = true;
      await this.fetchProfile();
    },
    async register(userData) {
      await authService.register(userData);
    },
    async fetchProfile() {
      if (this.token) {
        const response = await authService.fetchProfile(this.token);
        this.user = response.data;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export default useAuthStore;

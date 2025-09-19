import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  actions: {
    async login(credentials) {
      const response = await axios.post(`${API_URL}/login`, credentials);
      this.token = response.data.token;
      localStorage.setItem('token', this.token);
      this.isAuthenticated = true;
      await this.fetchProfile();
    },
    async register(userData) {
      await axios.post(`${API_URL}/register`, userData);
    },
    async fetchProfile() {
      if (this.token) {
        const response = await axios.get(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
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

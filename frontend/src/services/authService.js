import api from './api';

const login = (credentials) => {
  return api.post('/login', credentials);
};

const register = (userData) => {
  return api.post('/register', userData);
};

const fetchProfile = (token) => {
  return api.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  login,
  register,
  fetchProfile,
};

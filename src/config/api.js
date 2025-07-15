// src/config/api.js

import axios from 'axios';

// ✅ Dynamic base URL for dev and production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://mentorship-backend-2.onrender.com';

// ✅ Create axios instance with baseURL and timeout
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  withCredentials: true, // if your backend uses cookies for auth
});

// ==============================
// Example endpoint: get current user
// ==============================
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('getCurrentUser error:', error);
    throw error;
  }
};

// ==============================
// Export axios instance as default
// ==============================
export default api;

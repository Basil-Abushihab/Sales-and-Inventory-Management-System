import axiosClient from 'axios';

export const axios = axiosClient.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});
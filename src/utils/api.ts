// src/utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // 必须与后端credentials: true配对
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': 'http://localhost:5173',
  //   'Access-Control-Allow-Credentials': true,
  //   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  // }
});

// 请求拦截器
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // 处理未授权
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const courseAPI = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
  enroll: (courseId) => api.post(`/courses/${courseId}/enroll`),
};

export const paymentAPI = {
  process: (data) => api.post('/payments/process', data),
  getMethods: () => api.get('/payments/methods'),
  getHistory: () => api.get('/payments/history'),
  processPayout: (data) => api.post('/payments/payouts', data),
};

export const userAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const analyticsAPI = {
  getOverview: () => api.get('/analytics/overview'),
  getRevenue: (period) => api.get(`/analytics/revenue?period=${period}`),
  getStudentStats: () => api.get('/analytics/students'),
  getCoursePerformance: () => api.get('/analytics/courses'),
};

export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getTaxInfo: () => api.get('/admin/tax'),
  generateDocument: (type) => api.post('/admin/documents', { type }),
  getMarketingStats: () => api.get('/admin/marketing'),
};

export default api;

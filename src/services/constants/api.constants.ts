/**
 * API Constants
 * Base URLs, endpoints, and API configuration
 */

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
export const API_TIMEOUT = 30000; // 30 seconds

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/Users/Login/Users',
    REGISTER: '/api/Users/Register',
    LOGOUT: '/api/Users/Logout',
  },
  USERS: {
    SEARCH: '/api/Users/UserSearch',
    LIST: '/api/Users/UserList',
    GET: '/api/Users/UserInfo',
  },
  STUDENTS: {
    SEARCH: '/api/Students/StudentSearch',
    LIST: '/api/Students/StudentList',
  },
};

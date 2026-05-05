import axios from '../axios.customize';

// ─── PAYMENTS ─────────────────────────────────────────────────────────
export const getPaymentsAPI = (params?: any) =>
    axios.get('/api/Payments/Payments', { params });

export const getUserPaymentsAPI = (params?: any) =>
    axios.get('/api/Payments/User/Payments', { params });

export const getUserWalletsAPI = (params?: any) =>
    axios.get('/api/Payments/User/Wallets', { params });

export const getStudentWalletsAPI = (params?: any) =>
    axios.get('/api/Payments/User/StudentWallets', { params });

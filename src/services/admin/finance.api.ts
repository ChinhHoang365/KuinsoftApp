import axios from 'services/axios.customize';

// ─── PAYMENTS ─────────────────────────────────────────────────────────
export const getPaymentsAPI = (params?: any) => {
    const urlBackend = '/api/Payments/Payments';
    return axios.get(urlBackend, { params });
};

export const getUserPaymentsAPI = (params?: any) => {
    const urlBackend = '/api/Payments/User/Payments';
    return axios.get(urlBackend, { params });
};

export const getUserWalletsAPI = (params?: any) => {
    const urlBackend = '/api/Payments/User/Wallets';
    return axios.get(urlBackend, { params });
};

export const getStudentWalletsAPI = (params?: any) => {
    const urlBackend = '/api/Payments/User/StudentWallets';
    return axios.get(urlBackend, { params });
};

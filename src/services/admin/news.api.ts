import axios from '../axios.customize';

// ─── NEWS - ADMINISTRATION ───────────────────────────────────────────
export const getAdminNewsListAPI = (params?: any) =>
    axios.get('/api/News/Admin/NewsList', { params });

export const getUserNewsListAPI = (params?: any) =>
    axios.get('/api/News/User/NewsList', { params });

export const getNewsDetailAPI = (newsID: number) =>
    axios.get(`/api/News/NewsDetail?newsID=${newsID}`);

export const createNewsAPI = (data: any) =>
    axios.post('/api/News/CreateNews', data);

export const updateNewsAPI = (data: any) =>
    axios.put('/api/News/UpdateNews', data);

export const deleteNewsAPI = (newsID: number) =>
    axios.delete(`/api/News/DeleteNews?newsID=${newsID}`);

export const tidyUpNewsContentAPI = () =>
    axios.get('/api/News/TidyUpContent');

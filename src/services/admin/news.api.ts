import axios from 'services/axios.customize';

// ─── NEWS - ADMINISTRATION ───────────────────────────────────────────
export const getAdminNewsListAPI = (params?: any) =>
{
    const urlBackend = '/api/News/Admin/NewsList';
    return axios.get(urlBackend, { params });
};

export const getUserNewsListAPI = (params?: any) =>
{
    const urlBackend = '/api/News/User/NewsList';
    return axios.get(urlBackend, { params });
};

export const getNewsDetailAPI = (newsID: number) =>
{
    const urlBackend = `/api/News/NewsDetail?newsID=${newsID}`;
    return axios.get(urlBackend);
};

export const createNewsAPI = (data: any) =>
{
    const urlBackend = '/api/News/CreateNews';
    return axios.post(urlBackend, data);
};

export const updateNewsAPI = (data: any) =>
{
    const urlBackend = '/api/News/UpdateNews';
    return axios.put(urlBackend, data);
};

export const deleteNewsAPI = (newsID: number) =>
{
    const urlBackend = `/api/News/DeleteNews?newsID=${newsID}`;
    return axios.delete(urlBackend);
};

export const tidyUpNewsContentAPI = () =>
{
    const urlBackend = '/api/News/TidyUpContent';
    return axios.get(urlBackend);
};

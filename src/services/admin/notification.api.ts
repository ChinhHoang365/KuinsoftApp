import axios from 'services/axios.customize';

// ─── NOTIFICATIONS - SEND & RECEIVE ──────────────────────────────────
export const sendNotificationAPI = (data: any) => {
    const urlBackend = '/api/notification/send';
    return axios.post(urlBackend, data);
};

export const receiveNotificationAPI = (data: any) => {
    const urlBackend = '/api/notification/receiveNoti';
    return axios.post(urlBackend, data);
};

export const deleteReceivedNotificationAPI = (id: number) => {
    const urlBackend = `/api/notification/receiveNoti?id=${id}`;
    return axios.delete(urlBackend);
};

export const directNotificationToScheduleAPI = (data: any) => {
    const urlBackend = '/api/notification/NotificationDirectToSchedule';
    return axios.post(urlBackend, data);
};

// ─── NOTIFICATIONS - USER INBOX ──────────────────────────────────────
export const getNotiListByUserAPI = (params?: any) => {
    const urlBackend = '/api/notification/getNotiListByUser';
    return axios.get(urlBackend, { params });
};

export const getNotiListByCategoryAPI = (category: string) => {
    const urlBackend = `/api/notification/getlistByCategory?category=${category}`;
    return axios.get(urlBackend);
};

export const listNotiCategoriesAPI = () => {
    const urlBackend = '/api/notification/ListCategory';
    return axios.get(urlBackend);
};

export const readANotificationAPI = (id: number) => {
    const urlBackend = `/api/notification/ReadANoti?id=${id}`;
    return axios.put(urlBackend);
};

export const readAllNotificationsAPI = () => {
    const urlBackend = '/api/notification/ReadAllNoti';
    return axios.put(urlBackend);
};

export const countUnreadNotificationsAPI = () => {
    const urlBackend = '/api/notification/CountUnread';
    return axios.put(urlBackend);
};

// ─── NOTIFICATIONS - DEVICE MANAGEMENT ───────────────────────────────
export const getRegisteredDevicesAPI = () => {
    const urlBackend = '/api/notification/GetRegisteredDevices';
    return axios.get(urlBackend);
};

export const registerDeviceAPI = (data: any) => {
    const urlBackend = '/api/notification/register';
    return axios.post(urlBackend, data);
};

export const unregisterDeviceAPI = (token: string) => {
    const urlBackend = `/api/notification/unregister?token=${token}`;
    return axios.delete(urlBackend);
};

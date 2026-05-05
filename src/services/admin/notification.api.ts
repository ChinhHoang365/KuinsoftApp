import axios from '../axios.customize';

// ─── NOTIFICATIONS - SEND & RECEIVE ──────────────────────────────────
export const sendNotificationAPI = (data: any) =>
    axios.post('/api/notification/send', data);

export const receiveNotificationAPI = (data: any) =>
    axios.post('/api/notification/receiveNoti', data);

export const deleteReceivedNotificationAPI = (id: number) =>
    axios.delete(`/api/notification/receiveNoti?id=${id}`);

export const directNotificationToScheduleAPI = (data: any) =>
    axios.post('/api/notification/NotificationDirectToSchedule', data);

// ─── NOTIFICATIONS - USER INBOX ──────────────────────────────────────
export const getNotiListByUserAPI = (params?: any) =>
    axios.get('/api/notification/getNotiListByUser', { params });

export const getNotiListByCategoryAPI = (category: string) =>
    axios.get(`/api/notification/getlistByCategory?category=${category}`);

export const listNotiCategoriesAPI = () =>
    axios.get('/api/notification/ListCategory');

export const readANotificationAPI = (id: number) =>
    axios.put(`/api/notification/ReadANoti?id=${id}`);

export const readAllNotificationsAPI = () =>
    axios.put('/api/notification/ReadAllNoti');

export const countUnreadNotificationsAPI = () =>
    axios.put('/api/notification/CountUnread');

// ─── NOTIFICATIONS - DEVICE MANAGEMENT ───────────────────────────────
export const getRegisteredDevicesAPI = () =>
    axios.get('/api/notification/GetRegisteredDevices');

export const registerDeviceAPI = (data: any) =>
    axios.post('/api/notification/register', data);

export const unregisterDeviceAPI = (token: string) =>
    axios.delete(`/api/notification/unregister?token=${token}`);

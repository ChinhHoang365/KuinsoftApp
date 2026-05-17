import axios from 'services/axios.customize';

// ─── CRONJOBS - AUTOMATION ──────────────────────────────────────────
export const scheduleCronjobAPI = (data: any) => {
    const urlBackend = '/api/Cronjob/schedule';
    return axios.post(urlBackend, data);
};

export const cleanUpPushDevicesAPI = () => {
    const urlBackend = '/api/Cronjob/CleanUpPushDevices';
    return axios.get(urlBackend);
};

export const setupHourlyAnnouncementAPI = () => {
    const urlBackend = '/api/Cronjob/SetupHourlyScheduleAnouncement';
    return axios.get(urlBackend);
};

export const sendNotificationAnnouncementAPI = () => {
    const urlBackend = '/api/Cronjob/SendNotificationAnouncementAsync';
    return axios.get(urlBackend);
};

export const setupDailyScheduleAPI = () => {
    const urlBackend = '/api/Cronjob/SetupDailySchedule';
    return axios.get(urlBackend);
};

export const setupDailyNewsTidyUpAPI = () => {
    const urlBackend = '/api/Cronjob/SetupDailyNewsTidyUp';
    return axios.get(urlBackend);
};

export const sendNotificationAsyncAPI = () => {
    const urlBackend = '/api/Cronjob/SendNotificationAsync';
    return axios.get(urlBackend);
};

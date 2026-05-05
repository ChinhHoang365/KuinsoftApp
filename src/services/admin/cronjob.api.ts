import axios from '../axios.customize';

// ─── CRONJOBS - AUTOMATION ──────────────────────────────────────────
export const scheduleCronjobAPI = (data: any) =>
    axios.post('/api/Cronjob/schedule', data);

export const cleanUpPushDevicesAPI = () =>
    axios.get('/api/Cronjob/CleanUpPushDevices');

export const setupHourlyAnnouncementAPI = () =>
    axios.get('/api/Cronjob/SetupHourlyScheduleAnouncement');

export const sendNotificationAnnouncementAPI = () =>
    axios.get('/api/Cronjob/SendNotificationAnouncementAsync');

export const setupDailyScheduleAPI = () =>
    axios.get('/api/Cronjob/SetupDailySchedule');

export const setupDailyNewsTidyUpAPI = () =>
    axios.get('/api/Cronjob/SetupDailyNewsTidyUp');

export const sendNotificationAsyncAPI = () =>
    axios.get('/api/Cronjob/SendNotificationAsync');

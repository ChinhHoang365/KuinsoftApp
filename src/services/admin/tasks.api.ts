import axios from '../axios.customize';

// ─── APPOINTMENTS & TASKS ───────────────────────────────────────────
export const addAppointmentAPI = (data: any) =>
    axios.post('/api/Task/Appointment_Add', data);

export const updateAppointmentAPI = (data: any) =>
    axios.put('/api/Task/Appointment_Update', data);

export const deleteAppointmentAPI = (id: number) =>
    axios.delete(`/api/Task/Appointment_Delete?id=${id}`);

export const getAppointmentByIDAPI = (id: number) =>
    axios.get(`/api/Task/AppointmentByID?id=${id}`);

export const getAppointmentByTeacherAPI = (teacherID: number) =>
    axios.get(`/api/Task/AppointmentByTeacherID?teacherID=${teacherID}`);

// ─── MASTER DATA & LISTS ─────────────────────────────────────────────
export const getAppointmentVisibilitiesAPI = () =>
    axios.get('/api/Task/APPOINTMENTVISIBILITES_List');

export const getTaskPrioritiesAPI = () =>
    axios.get('/api/Task/APPOINTMENTTASKPRIORITIES_List');

export const getTaskFrequenciesAPI = () =>
    axios.get('/api/Task/APPOINTMENTFREQUENCYOCCURS_List');

export const getAppointmentCategoriesAPI = () =>
    axios.get('/api/Task/APPOINTMENTCATEGORIES_List');

export const getTeacherGroupByTeacherIDAPI = (teacherID: number) =>
    axios.get(`/api/Task/TeacherGroupByTeacherID?teacherID=${teacherID}`);

import axios from 'services/axios.customize';

// ─── APPOINTMENTS & TASKS ───────────────────────────────────────────
export const addAppointmentAPI = (data: any) => {
    const urlBackend = '/api/Task/Appointment_Add';
    return axios.post(urlBackend, data);
};

export const updateAppointmentAPI = (data: any) => {
    const urlBackend = '/api/Task/Appointment_Update';
    return axios.put(urlBackend, data);
};

export const deleteAppointmentAPI = (id: number) => {
    const urlBackend = `/api/Task/Appointment_Delete?id=${id}`;
    return axios.delete(urlBackend);
};

export const getAppointmentByIDAPI = (id: number) => {
    const urlBackend = `/api/Task/AppointmentByID?id=${id}`;
    return axios.get(urlBackend);
};

export const getAppointmentByTeacherAPI = (teacherID: number) => {
    const urlBackend = `/api/Task/AppointmentByTeacherID?teacherID=${teacherID}`;
    return axios.get(urlBackend);
};

// ─── MASTER DATA & LISTS ─────────────────────────────────────────────
export const getAppointmentVisibilitiesAPI = () => {
    const urlBackend = '/api/Task/APPOINTMENTVISIBILITES_List';
    return axios.get(urlBackend);
};

export const getTaskPrioritiesAPI = () => {
    const urlBackend = '/api/Task/APPOINTMENTTASKPRIORITIES_List';
    return axios.get(urlBackend);
};

export const getTaskFrequenciesAPI = () => {
    const urlBackend = '/api/Task/APPOINTMENTFREQUENCYOCCURS_List';
    return axios.get(urlBackend);
};

export const getAppointmentCategoriesAPI = () => {
    const urlBackend = '/api/Task/APPOINTMENTCATEGORIES_List';
    return axios.get(urlBackend);
};

export const getTeacherGroupByTeacherIDAPI = (teacherID: number) => {
    const urlBackend = `/api/Task/TeacherGroupByTeacherID?teacherID=${teacherID}`;
    return axios.get(urlBackend);
};

import axios from 'services/axios.customize';

// ─── FEEDBACKS - GENERALS ───────────────────────────────────────────
export const feedbackToStudentsAPI = (data: any) => {
    const urlBackend = '/api/Feedbacks/generals/to-students';
    return axios.post(urlBackend, data);
};

export const feedbackToClassAPI = (data: any) => {
    const urlBackend = '/api/Feedbacks/generals/to-class';
    return axios.post(urlBackend, data);
};

export const getFeedbacksByStudentAPI = (studentID: number) => {
    const urlBackend = `/api/Feedbacks/generals/by-student?studentID=${studentID}`;
    return axios.get(urlBackend);
};

export const getFeedbacksByQCAPI = (qcID: number) => {
    const urlBackend = `/api/Feedbacks/generals/by-qc?qcID=${qcID}`;
    return axios.get(urlBackend);
};

export const getFeedbackInfoAPI = (params?: any) => {
    const urlBackend = '/api/Feedbacks/generals/infor';
    return axios.get(urlBackend, { params });
};

export const getFeedbackByAdminAPI = (data: any) => {
    const urlBackend = '/api/Feedbacks/generals/by-admin';
    return axios.post(urlBackend, data);
};

export const updateFeedbackStatusAPI = (data: any) => {
    const urlBackend = '/api/Feedbacks/generals/status';
    return axios.put(urlBackend, data);
};

export const deleteGeneralFeedbackAPI = (id: number) => {
    const urlBackend = `/api/Feedbacks/generals?id=${id}`;
    return axios.delete(urlBackend);
};

export const getFeedbackGeneralByUserAndClassAPI = (userID: number, classID: number) => {
    const urlBackend = `/api/Feedbacks/FBGeneralByUserIDAndClassID?userID=${userID}&classID=${classID}`;
    return axios.get(urlBackend);
};

// ─── FEEDBACKS - DETAILS ─────────────────────────────────────────────
export const createFeedbackDetailAPI = (data: any) => {
    const urlBackend = '/api/Feedbacks/details';
    return axios.post(urlBackend, data);
};

export const addNewFeedbackDetailAPI = (data: any) => {
    const urlBackend = '/api/Feedbacks/FBDetail_AddNew';
    return axios.post(urlBackend, data);
};

export const updateFeedbackDetailAPI = (data: any) => {
    const urlBackend = '/api/Feedbacks/details';
    return axios.put(urlBackend, data);
};

export const updateFBDetailAPI = (data: any) => {
    const urlBackend = '/api/Feedbacks/FBDetail_Update';
    return axios.put(urlBackend, data);
};

export const deleteFeedbackDetailAPI = (id: number) => {
    const urlBackend = `/api/Feedbacks/details?id=${id}`;
    return axios.delete(urlBackend);
};

export const findFeedbackDetailsAPI = (params?: any) => {
    const urlBackend = '/api/Feedbacks/details/find';
    return axios.get(urlBackend, { params });
};

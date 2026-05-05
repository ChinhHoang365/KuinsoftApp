import axios from '../axios.customize';

// ─── FEEDBACKS - GENERALS ───────────────────────────────────────────
export const feedbackToStudentsAPI = (data: any) =>
    axios.post('/api/Feedbacks/generals/to-students', data);

export const feedbackToClassAPI = (data: any) =>
    axios.post('/api/Feedbacks/generals/to-class', data);

export const getFeedbacksByStudentAPI = (studentID: number) =>
    axios.get(`/api/Feedbacks/generals/by-student?studentID=${studentID}`);

export const getFeedbacksByQCAPI = (qcID: number) =>
    axios.get(`/api/Feedbacks/generals/by-qc?qcID=${qcID}`);

export const getFeedbackInfoAPI = (params?: any) =>
    axios.get('/api/Feedbacks/generals/infor', { params });

export const getFeedbackByAdminAPI = (data: any) =>
    axios.post('/api/Feedbacks/generals/by-admin', data);

export const updateFeedbackStatusAPI = (data: any) =>
    axios.put('/api/Feedbacks/generals/status', data);

export const deleteGeneralFeedbackAPI = (id: number) =>
    axios.delete(`/api/Feedbacks/generals?id=${id}`);

export const getFeedbackGeneralByUserAndClassAPI = (userID: number, classID: number) =>
    axios.get(`/api/Feedbacks/FBGeneralByUserIDAndClassID?userID=${userID}&classID=${classID}`);

// ─── FEEDBACKS - DETAILS ─────────────────────────────────────────────
export const createFeedbackDetailAPI = (data: any) =>
    axios.post('/api/Feedbacks/details', data);

export const addNewFeedbackDetailAPI = (data: any) =>
    axios.post('/api/Feedbacks/FBDetail_AddNew', data);

export const updateFeedbackDetailAPI = (data: any) =>
    axios.put('/api/Feedbacks/details', data);

export const updateFBDetailAPI = (data: any) =>
    axios.put('/api/Feedbacks/FBDetail_Update', data);

export const deleteFeedbackDetailAPI = (id: number) =>
    axios.delete(`/api/Feedbacks/details?id=${id}`);

export const findFeedbackDetailsAPI = (params?: any) =>
    axios.get('/api/Feedbacks/details/find', { params });

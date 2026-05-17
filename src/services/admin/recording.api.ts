import axios from 'services/axios.customize';

// ─── RECORDING CATEGORIES ───────────────────────────────────────────
export const addRecordCategoryAPI = (data: any) => {
    const urlBackend = '/api/Recording/RecordCategory_Add';
    return axios.post(urlBackend, data);
};

export const updateRecordCategoryAPI = (data: any) => {
    const urlBackend = '/api/Recording/RecordCategory_Update';
    return axios.put(urlBackend, data);
};

export const deleteRecordCategoryAPI = (id: number) => {
    const urlBackend = `/api/Recording/RecordCategory_Delete?id=${id}`;
    return axios.delete(urlBackend);
};

export const getRecordCategoryByIDAPI = (id: number) => {
    const urlBackend = `/api/Recording/RecordCategoryByID?id=${id}`;
    return axios.get(urlBackend);
};

export const getRecordCategoryListAPI = () => {
    const urlBackend = '/api/Recording/RecordCategoryList';
    return axios.get(urlBackend);
};

export const getRecordCategoryByClassAPI = (classID: number) => {
    const urlBackend = `/api/Recording/RecordCategoryByClassID?classID=${classID}`;
    return axios.get(urlBackend);
};

// ─── STUDENT RECORDINGS ─────────────────────────────────────────────
export const addStudentRecordingAPI = (data: any) => {
    const urlBackend = '/api/Recording/StudentRecording_Add';
    return axios.post(urlBackend, data);
};

export const updateStudentRecordingAPI = (data: any) => {
    const urlBackend = '/api/Recording/StudentRecording_Update';
    return axios.put(urlBackend, data);
};

export const updateRecordingCommentAPI = (data: any) => {
    const urlBackend = '/api/Recording/comment_Update';
    return axios.put(urlBackend, data);
};

export const deleteStudentRecordingAPI = (id: number) => {
    const urlBackend = `/api/Recording/StudentRecording_Delete?id=${id}`;
    return axios.delete(urlBackend);
};

export const getStudentRecordingByIDAPI = (id: number) => {
    const urlBackend = `/api/Recording/StudentRecordingByID?id=${id}`;
    return axios.get(urlBackend);
};

export const getStudentRecordingByClassAPI = (classID: number) => {
    const urlBackend = `/api/Recording/StudentRecordingByClassID?classID=${classID}`;
    return axios.get(urlBackend);
};

export const getStudentRecordingByClassAndStudentAPI = (classID: number, studentID: number) => {
    const urlBackend = `/api/Recording/StudentRecordingByClassIDByStudentID?classID=${classID}&studentID=${studentID}`;
    return axios.get(urlBackend);
};

// ─── CLASS RECORDINGS ───────────────────────────────────────────────
export const getClassRecordingByDateAPI = (date: string) => {
    const urlBackend = `/api/Recording/ClassRecordingByDate?date=${date}`;
    return axios.get(urlBackend);
};

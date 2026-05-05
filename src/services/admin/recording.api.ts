import axios from '../axios.customize';

// ─── RECORDING CATEGORIES ───────────────────────────────────────────
export const addRecordCategoryAPI = (data: any) =>
    axios.post('/api/Recording/RecordCategory_Add', data);

export const updateRecordCategoryAPI = (data: any) =>
    axios.put('/api/Recording/RecordCategory_Update', data);

export const deleteRecordCategoryAPI = (id: number) =>
    axios.delete(`/api/Recording/RecordCategory_Delete?id=${id}`);

export const getRecordCategoryByIDAPI = (id: number) =>
    axios.get(`/api/Recording/RecordCategoryByID?id=${id}`);

export const getRecordCategoryListAPI = () =>
    axios.get('/api/Recording/RecordCategoryList');

export const getRecordCategoryByClassAPI = (classID: number) =>
    axios.get(`/api/Recording/RecordCategoryByClassID?classID=${classID}`);

// ─── STUDENT RECORDINGS ─────────────────────────────────────────────
export const addStudentRecordingAPI = (data: any) =>
    axios.post('/api/Recording/StudentRecording_Add', data);

export const updateStudentRecordingAPI = (data: any) =>
    axios.put('/api/Recording/StudentRecording_Update', data);

export const updateRecordingCommentAPI = (data: any) =>
    axios.put('/api/Recording/comment_Update', data);

export const deleteStudentRecordingAPI = (id: number) =>
    axios.delete(`/api/Recording/StudentRecording_Delete?id=${id}`);

export const getStudentRecordingByIDAPI = (id: number) =>
    axios.get(`/api/Recording/StudentRecordingByID?id=${id}`);

export const getStudentRecordingByClassAPI = (classID: number) =>
    axios.get(`/api/Recording/StudentRecordingByClassID?classID=${classID}`);

export const getStudentRecordingByClassAndStudentAPI = (classID: number, studentID: number) =>
    axios.get(`/api/Recording/StudentRecordingByClassIDByStudentID?classID=${classID}&studentID=${studentID}`);

// ─── CLASS RECORDINGS ───────────────────────────────────────────────
export const getClassRecordingByDateAPI = (date: string) =>
    axios.get(`/api/Recording/ClassRecordingByDate?date=${date}`);

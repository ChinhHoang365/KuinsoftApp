import axios from 'services/axios.customize';

// ─── ADMINISTRATION / STAFF ABSENCE ──────────────────────────────────────

/**
 * Tìm kiếm danh sách nghỉ phép theo khoảng thời gian
 */
export const searchTeacherAbsence = (fromTime: string, toTime: string) => {
    const urlBackend = '/api/Administration/StaffAbsence/TeacherAbsenceSearch';
    return axios.get(urlBackend, {
        params: { fromTime, toTime }
    });
};

/**
 * Lấy tổng quan danh sách nghỉ phép
 */
export const getTeacherAbsenceOverview = () => {
    const urlBackend = '/api/Administration/StaffAbsence/TeacherAbsenceOverview';
    return axios.get(urlBackend);
};

/**
 * Lấy danh sách nghỉ phép của một giáo viên cụ thể
 */
export const getTeacherAbsenceByTeacher = (teacherID: number) => {
    const urlBackend = `/api/Administration/StaffAbsence/TeacherAbsenceOverviewByTeacher?teacherID=${teacherID}`;
    return axios.get(urlBackend);
};

/**
 * Đăng ký nghỉ phép mới
 */
export const assignStaffAbsence = (data: { fromTime: string, toTime: string, reason: string, teacherID?: number }) => {
    const urlBackend = '/api/Administration/StaffAbsence/Assign';
    return axios.post(urlBackend, data);
};

/**
 * Cập nhật thông tin nghỉ phép
 */
export const updateStaffAbsence = (data: { recordID: number, fromTime: string, toTime: string, reason: string, notes?: string }) => {
    const urlBackend = '/api/Administration/StaffAbsence/Update';
    return axios.put(urlBackend, data);
};

/**
 * Xóa bản ghi nghỉ phép
 */
export const deleteStaffAbsence = (recordID: number) => {
    const urlBackend = `/api/Administration/StaffAbsence/Delete?recordID=${recordID}`;
    return axios.delete(urlBackend);
};

/**
 * Duyệt hoặc từ chối đơn nghỉ phép
 */
export const approveOrRejectAbsence = (recordID: number, status: string, notes?: string) => {
    const urlBackend = `/api/Administration/Absence/ApproveOrReject`;
    return axios.put(urlBackend, { recordID, status, notes });
};

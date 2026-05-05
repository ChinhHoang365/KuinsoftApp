import axios from '../axios.customize';

// ─── ADMINISTRATION / STAFF ABSENCE ──────────────────────────────────────

/**
 * Tìm kiếm danh sách nghỉ phép theo khoảng thời gian
 */
export const searchTeacherAbsence = (fromTime: string, toTime: string) => {
    return axios.get('/api/Administration/StaffAbsence/TeacherAbsenceSearch', {
        params: { fromTime, toTime }
    });
};

/**
 * Lấy tổng quan danh sách nghỉ phép
 */
export const getTeacherAbsenceOverview = () => 
    axios.get('/api/Administration/StaffAbsence/TeacherAbsenceOverview');

/**
 * Lấy danh sách nghỉ phép của một giáo viên cụ thể
 */
export const getTeacherAbsenceByTeacher = (teacherID: number) => 
    axios.get(`/api/Administration/StaffAbsence/TeacherAbsenceOverviewByTeacher?teacherID=${teacherID}`);

/**
 * Đăng ký nghỉ phép mới
 */
export const assignStaffAbsence = (data: { fromTime: string, toTime: string, reason: string, teacherID?: number }) => 
    axios.post('/api/Administration/StaffAbsence/Assign', data);

/**
 * Cập nhật thông tin nghỉ phép
 */
export const updateStaffAbsence = (data: { recordID: number, fromTime: string, toTime: string, reason: string, notes?: string }) => 
    axios.put('/api/Administration/StaffAbsence/Update', data);

/**
 * Xóa bản ghi nghỉ phép
 */
export const deleteStaffAbsence = (recordID: number) => 
    axios.delete(`/api/Administration/StaffAbsence/Delete?recordID=${recordID}`);

/**
 * Duyệt hoặc từ chối đơn nghỉ phép
 */
export const approveOrRejectAbsence = (recordID: number, status: string, notes?: string) => 
    axios.put(`/api/Administration/Absence/ApproveOrReject`, { recordID, status, notes });

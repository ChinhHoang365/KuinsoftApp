import axios from 'services/axios.customize';

// ─── TEACHERS - FINANCE & SALARY ──────────────────────────────────────
export const getTeacherSalaryAPI = (params?: any) => {
    const urlBackend = '/api/Teachers/TeacherSalary';
    return axios.get(urlBackend, { params });
};

export const getTeacherSalaryDetailsAPI = (params?: any) => {
    const urlBackend = '/api/Teachers/TeacherSalarys/TeacherSalaryDetails';
    return axios.get(urlBackend, { params });
};

export const exportTeacherSalaryAPI = (params?: any) => {
    const urlBackend = '/api/Teachers/ExportTeacherSalary';
    return axios.get(urlBackend, { params });
};

export const exportTeacherSalaryDetailsAPI = (params?: any) => {
    const urlBackend = '/api/Teachers/ExportTeacherSalaryDetails';
    return axios.get(urlBackend, { params });
};

export const getTeachingRatesAPI = () => {
    const urlBackend = '/api/Teachers/TeachingRates';
    return axios.get(urlBackend);
};

export const getCurrenciesAPI = () => {
    const urlBackend = '/api/Teachers/Currencies';
    return axios.get(urlBackend);
};

// ─── TEACHERS - AVAILABILITY & ABSENCE ────────────────────────────────
export const getTeacherFreeTimeAPI = () => {
    const urlBackend = '/api/Teachers/TeacherFreeTime';
    return axios.get(urlBackend);
};

export const getTeacherFreeTimeListAPI = (params?: any) => {
    const urlBackend = '/api/Teachers/TeacherFreeTime/List';
    return axios.get(urlBackend, { params });
};

export const assignTeacherFreeTimeAPI = (data: any) => {
    const urlBackend = '/api/Teachers/TeacherFreeTime/Assign';
    return axios.post(urlBackend, data);
};

export const updateTeacherFreeTimeAPI = (data: any) => {
    const urlBackend = '/api/Teachers/TeacherFreeTime/Update';
    return axios.put(urlBackend, data);
};

export const deleteTeacherFreeTimeAPI = (id: number) => {
    const urlBackend = `/api/Teachers/TeacherFreeTime/Delete?id=${id}`;
    return axios.delete(urlBackend);
};

export const getTeacherAbsenceListAPI = (params?: any) => {
    const urlBackend = '/api/Teachers/TeacherAbsence/List';
    return axios.get(urlBackend, { params });
};

export const assignTeacherAbsenceAPI = (data: any) => {
    const urlBackend = '/api/Teachers/TeacherAbsence/Assign';
    return axios.post(urlBackend, data);
};

export const approveOrRejectTeacherAbsenceAPI = (data: any) => {
    const urlBackend = '/api/Teachers/TeacherAbsence/ApproveOrReject';
    return axios.put(urlBackend, data);
};

// ─── TEACHERS - OPERATIONS ────────────────────────────────────────────
export const getTeachersListAPI = () => {
    const urlBackend = '/api/Teachers/TeachersList';
    return axios.get(urlBackend);
};

export const getTeacherAssistantsAPI = () => {
    const urlBackend = '/api/Teachers/TeacherAssistantsList';
    return axios.get(urlBackend);
};

export const getTeacherCalendarAPI = (teacherID: number, fromDate: string, toDate: string) => {
    const urlBackend = `/api/Teachers/GetCalendar?teacherID=${teacherID}&fromDate=${fromDate}&toDate=${toDate}`;
    return axios.get(urlBackend);
};

export const assignSubstituteTeacherAPI = (data: any) => {
    const urlBackend = '/api/Teachers/ClassSchedule/AssignSubstituteTeacher';
    return axios.post(urlBackend, data);
};

export const getQCListAPI = () => {
    const urlBackend = '/api/Teachers/QCList';
    return axios.get(urlBackend);
};

export const getTeacherScalesAPI = () => {
    const urlBackend = '/api/Teachers/TeacherScales';
    return axios.get(urlBackend);
};

export const getTeacherTypesAPI = () => {
    const urlBackend = '/api/Teachers/TeacherTypes';
    return axios.get(urlBackend);
};

export const getTeacherGroupsAPI = () => {
    const urlBackend = '/api/Teachers/TeacherGroup';
    return axios.get(urlBackend);
};

export const getStaffLeaveBalanceAPI = () => {
    const urlBackend = '/api/Teachers/StaffLeaveBalance';
    return axios.get(urlBackend);
};

// ─── COUNSELORS ───────────────────────────────────────────────────────
export const getCounselorListAPI = () => {
    const urlBackend = '/api/Counselors/CounselorList';
    return axios.get(urlBackend);
};

export const getCounselorsAPI = () => {
    const urlBackend = '/api/Counselors';
    return axios.get(urlBackend);
};

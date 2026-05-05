import axios from '../axios.customize';

// ─── TEACHERS - FINANCE & SALARY ──────────────────────────────────────
export const getTeacherSalaryAPI = (params?: any) =>
    axios.get('/api/Teachers/TeacherSalary', { params });

export const getTeacherSalaryDetailsAPI = (params?: any) =>
    axios.get('/api/Teachers/TeacherSalarys/TeacherSalaryDetails', { params });

export const exportTeacherSalaryAPI = (params?: any) =>
    axios.get('/api/Teachers/ExportTeacherSalary', { params });

export const exportTeacherSalaryDetailsAPI = (params?: any) =>
    axios.get('/api/Teachers/ExportTeacherSalaryDetails', { params });

export const getTeachingRatesAPI = () =>
    axios.get('/api/Teachers/TeachingRates');

export const getCurrenciesAPI = () =>
    axios.get('/api/Teachers/Currencies');

// ─── TEACHERS - AVAILABILITY & ABSENCE ────────────────────────────────
export const getTeacherFreeTimeAPI = () =>
    axios.get('/api/Teachers/TeacherFreeTime');

export const getTeacherFreeTimeListAPI = (params?: any) =>
    axios.get('/api/Teachers/TeacherFreeTime/List', { params });

export const assignTeacherFreeTimeAPI = (data: any) =>
    axios.post('/api/Teachers/TeacherFreeTime/Assign', data);

export const updateTeacherFreeTimeAPI = (data: any) =>
    axios.put('/api/Teachers/TeacherFreeTime/Update', data);

export const deleteTeacherFreeTimeAPI = (id: number) =>
    axios.delete(`/api/Teachers/TeacherFreeTime/Delete?id=${id}`);

export const getTeacherAbsenceListAPI = (params?: any) =>
    axios.get('/api/Teachers/TeacherAbsence/List', { params });

export const assignTeacherAbsenceAPI = (data: any) =>
    axios.post('/api/Teachers/TeacherAbsence/Assign', data);

export const approveOrRejectTeacherAbsenceAPI = (data: any) =>
    axios.put('/api/Teachers/TeacherAbsence/ApproveOrReject', data);

// ─── TEACHERS - OPERATIONS ────────────────────────────────────────────
export const getTeachersListAPI = () =>
    axios.get('/api/Teachers/TeachersList');

export const getTeacherAssistantsAPI = () =>
    axios.get('/api/Teachers/TeacherAssistantsList');

export const getTeacherCalendarAPI = (teacherID: number, fromDate: string, toDate: string) =>
    axios.get(`/api/Teachers/GetCalendar?teacherID=${teacherID}&fromDate=${fromDate}&toDate=${toDate}`);

export const assignSubstituteTeacherAPI = (data: any) =>
    axios.post('/api/Teachers/ClassSchedule/AssignSubstituteTeacher', data);

export const getQCListAPI = () =>
    axios.get('/api/Teachers/QCList');

export const getTeacherScalesAPI = () =>
    axios.get('/api/Teachers/TeacherScales');

export const getTeacherTypesAPI = () =>
    axios.get('/api/Teachers/TeacherTypes');

export const getTeacherGroupsAPI = () =>
    axios.get('/api/Teachers/TeacherGroup');

export const getStaffLeaveBalanceAPI = () =>
    axios.get('/api/Teachers/StaffLeaveBalance');

// ─── COUNSELORS ───────────────────────────────────────────────────────
export const getCounselorListAPI = () =>
    axios.get('/api/Counselors/CounselorList');

export const getCounselorsAPI = () =>
    axios.get('/api/Counselors');

import axios from 'services/axios.customize';

// ─── CLASS CORE & MANAGEMENT ────────────────────────────────────────
export const getClassesByLocationAPI = (locationID: number) => {
    const urlBackend = `/api/Classes/ClassByLocation?locationID=${locationID}`;
    return axios.get(urlBackend);
};

export const getClassInfoAPI = (classID: number) => {
    const urlBackend = `/api/Classes/ClassInfo?classID=${classID}`;
    return axios.get(urlBackend);
};

export const createClassAPI = (data: any) => {
    const urlBackend = '/api/Classes/CreateClass';
    return axios.post(urlBackend, data);
};

export const updateClassAPI = (data: any) => {
    const urlBackend = '/api/Classes/UpdateClass';
    return axios.put(urlBackend, data);
};

export const quickSearchClassAPI = (data: any) => {
    const urlBackend = '/api/Classes/QuickSearchClass';
    return axios.post(urlBackend, data);
};

// ─── ATTENDANCE & DILIGENTS ──────────────────────────────────────────
export const getAttendanceAPI = (params: any) => {
    const urlBackend = '/api/Classes/Attendance';
    return axios.get(urlBackend, { params });
};

export const updateStudentAttendancesAPI = (classID: number, scheduleID: number, data: any) => {
    const urlBackend = `/api/Classes/StudentAttendances?classdID=${classID}&ScheduleID=${scheduleID}`;
    return axios.put(urlBackend, data);
};

export const getStudentDiligentsAPI = (classID: number) => {
    const urlBackend = `/api/Classes/StudentDiligents?classID=${classID}`;
    return axios.get(urlBackend);
};

// ─── SCHEDULES & TEACHERS ────────────────────────────────────────────
export const getClassScheduleAPI = (classID: number) => {
    const urlBackend = `/api/Classes/ClassSchedule/Schedule?classID=${classID}`;
    return axios.get(urlBackend);
};

export const getTeacherScheduleAPI = (teacherID: number) => {
    const urlBackend = `/api/Classes/TeacherSchedule?teacherID=${teacherID}`;
    return axios.get(urlBackend);
};

export const getDailyAbsentTeachersAPI = () => {
    const urlBackend = '/api/Classes/DailyAbsentTeacher';
    return axios.get(urlBackend);
};

export const substituteTeacherOverviewAPI = (data: any) => {
    const urlBackend = '/api/Classes/SubstituteTeacherOverview';
    return axios.post(urlBackend, data);
};

// ─── CHAT & CONFERENCES ──────────────────────────────────────────────
export const getClassChatSearchAPI = (params: any) => {
    const urlBackend = '/api/Classes/Chat/ChatSearch';
    return axios.get(urlBackend, { params });
};

export const sendChatToStudentsAPI = (data: any) => {
    const urlBackend = '/api/Classes/Chat/ClassAdmin/ToStudentsAndParents';
    return axios.post(urlBackend, data);
};

// ─── MASTER DATA FOR CLASSES ─────────────────────────────────────────
export const getClassStatusAPI = () => {
    const urlBackend = '/api/Classes/ClassStatus';
    return axios.get(urlBackend);
};
export const getClassTypesAPI = () => {
    const urlBackend = '/api/Classes/ClassTypes';
    return axios.get(urlBackend);
};
export const getRoomsAPI = () => {
    const urlBackend = '/api/Classes/Room';
    return axios.get(urlBackend);
};
export const getShiftsAPI = () => {
    const urlBackend = '/api/Classes/Shifts';
    return axios.get(urlBackend);
};
export const getProgrammesAPI = () => {
    const urlBackend = '/api/Classes/Programmes';
    return axios.get(urlBackend);
};
export const getLevelsAPI = (programmeID: number) => {
    const urlBackend = `/api/Classes/Levels/LevelsByProgramme?programmeID=${programmeID}`;
    return axios.get(urlBackend);
};

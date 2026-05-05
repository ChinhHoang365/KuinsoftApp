import axios from '../axios.customize';

// ─── CLASS CORE & MANAGEMENT ────────────────────────────────────────
export const getClassesByLocationAPI = (locationID: number) =>
    axios.get(`/api/Classes/ClassByLocation?locationID=${locationID}`);

export const getClassInfoAPI = (classID: number) =>
    axios.get(`/api/Classes/ClassInfo?classID=${classID}`);

export const createClassAPI = (data: any) =>
    axios.post('/api/Classes/CreateClass', data);

export const updateClassAPI = (data: any) =>
    axios.put('/api/Classes/UpdateClass', data);

export const quickSearchClassAPI = (data: any) =>
    axios.post('/api/Classes/QuickSearchClass', data);

// ─── ATTENDANCE & DILIGENTS ──────────────────────────────────────────
export const getAttendanceAPI = (params: any) =>
    axios.get('/api/Classes/Attendance', { params });

export const updateStudentAttendancesAPI = (classID: number, scheduleID: number, data: any) =>
    axios.put(`/api/Classes/StudentAttendances?classdID=${classID}&ScheduleID=${scheduleID}`, data);

export const getStudentDiligentsAPI = (classID: number) =>
    axios.get(`/api/Classes/StudentDiligents?classID=${classID}`);

// ─── SCHEDULES & TEACHERS ────────────────────────────────────────────
export const getClassScheduleAPI = (classID: number) =>
    axios.get(`/api/Classes/ClassSchedule/Schedule?classID=${classID}`);

export const getTeacherScheduleAPI = (teacherID: number) =>
    axios.get(`/api/Classes/TeacherSchedule?teacherID=${teacherID}`);

export const getDailyAbsentTeachersAPI = () =>
    axios.get('/api/Classes/DailyAbsentTeacher');

export const substituteTeacherOverviewAPI = (data: any) =>
    axios.post('/api/Classes/SubstituteTeacherOverview', data);

// ─── CHAT & CONFERENCES ──────────────────────────────────────────────
export const getClassChatSearchAPI = (params: any) =>
    axios.get('/api/Classes/Chat/ChatSearch', { params });

export const sendChatToStudentsAPI = (data: any) =>
    axios.post('/api/Classes/Chat/ClassAdmin/ToStudentsAndParents', data);

// ─── MASTER DATA FOR CLASSES ─────────────────────────────────────────
export const getClassStatusAPI = () => axios.get('/api/Classes/ClassStatus');
export const getClassTypesAPI = () => axios.get('/api/Classes/ClassTypes');
export const getRoomsAPI = () => axios.get('/api/Classes/Room');
export const getShiftsAPI = () => axios.get('/api/Classes/Shifts');
export const getProgrammesAPI = () => axios.get('/api/Classes/Programmes');
export const getLevelsAPI = (programmeID: number) => 
    axios.get(`/api/Classes/Levels/LevelsByProgramme?programmeID=${programmeID}`);

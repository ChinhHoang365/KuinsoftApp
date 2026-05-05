import axios from '../axios.customize';

// ─── CLASSES ──────────────────────────────────────────────────────────
export const getClassByLocationAPI = (locationID: number) =>
    axios.get(`/api/Classes/ClassByLocation?locationID=${locationID}`);

export const getClassInfoAPI = (classID: number) =>
    axios.get(`/api/Classes/ClassInfo?classID=${classID}`);

export const getClassOverviewAPI = (classID: number) =>
    axios.get(`/api/Classes/ClassOverview?classID=${classID}`);

export const getClassesAPI = (params?: any) =>
    axios.get('/api/Classes/ClassByLocation', { params });

export const createClassAPI = (data: any) =>
    axios.post('/api/Classes/CreateClass', data);

export const updateClassAPI = (data: any) =>
    axios.put('/api/Classes/UpdateClass', data);

export const getClassScheduleAPI = (classID: number) =>
    axios.get(`/api/Classes/ClassSchedule/Schedule?classID=${classID}`);

export const getClassScheduleByDateAPI = (date: string, locationID: number) =>
    axios.get(`/api/Classes/ClassSchedule/ScheduleByDate?date=${date}&locationID=${locationID}`);

export const getProgrammesAPI = () =>
    axios.get('/api/Classes/Programmes');

export const getLevelsByProgrammeAPI = (programmeID: number) =>
    axios.get(`/api/Classes/Levels/LevelsByProgramme?programmeID=${programmeID}`);

export const getClassShiftsAPI = () =>
    axios.get('/api/Classes/Shifts');

export const getClassStatusAPI = () =>
    axios.get('/api/Classes/ClassStatus');

export const getClassRoomsAPI = () =>
    axios.get('/api/Classes/Room');

export const getDayOfWeekAPI = () =>
    axios.get('/api/Classes/DayOfWeek');

export const getClassAttendanceAPI = (classID: number, scheduleID: number) =>
    axios.get(`/api/Classes/Attendance?classID=${classID}&scheduleID=${scheduleID}`);

export const getClassFeedbackAPI = (classID: number) =>
    axios.get(`/api/Classes/Feedback?classID=${classID}`);

export const quickSearchClassAPI = (data: any) =>
    axios.post('/api/Classes/QuickSearchClass', data);

// ─── ROOMS ────────────────────────────────────────────────────────────
export const getRoomsByLocationAndDateAPI = (locationID: number, date: string) =>
    axios.get(`/api/Rooms/by-LocationAndDate?locationID=${locationID}&date=${date}`);

export const getFreeRoomsAPI = (params?: any) =>
    axios.get('/api/Rooms/free', { params });

export const getNotRegisteredRoomsAPI = (params?: any) =>
    axios.get('/api/Rooms/not-register', { params });

// ─── MAKE-UP LESSONS ──────────────────────────────────────────────────
export const getMakeUpLessonsAPI = () =>
    axios.get('/api/MakeUpLesson/GetList');

export const getMakeUpLessonByIdAPI = (id: number) =>
    axios.get(`/api/MakeUpLesson/GetByID?id=${id}`);

export const createMakeUpLessonAPI = (data: any) =>
    axios.post('/api/MakeUpLesson/Create', data);

export const updateMakeUpLessonAPI = (data: any) =>
    axios.put('/api/MakeUpLesson/Update', data);

export const deleteMakeUpLessonAPI = (id: number) =>
    axios.delete(`/api/MakeUpLesson/Delete?id=${id}`);

export const getMakeUpLessonProgramListAPI = () =>
    axios.get('/api/MakeUpLesson/ProgramList');

// ─── COURSES (via Classes Programmes) ─────────────────────────────────
export const getCoursesAPI = () =>
    axios.get('/api/Classes/Programmes');

export const getProgrammesByDepartmentAPI = (departmentID: number) =>
    axios.get(`/api/Classes/Programmes/ProgrammesByDeparment?departmentID=${departmentID}`);

// ─── SIDE ACTIVITIES ──────────────────────────────────────────────────
export const getSideActivitiesAPI = (params?: any) =>
    axios.get('/api/SideActivities/Search', { params });

export const getSideActivitiesByStudentAPI = (studentID: number) =>
    axios.get(`/api/SideActivities/ListByStudent?studentID=${studentID}`);

export const getSideActivitiesTypesAPI = () =>
    axios.get('/api/SideActivities/ListType');

export const getSideActivityByIdAPI = (id: number) =>
    axios.get(`/api/SideActivities/GetByID?id=${id}`);

export const deleteSideActivityAPI = (id: number) =>
    axios.delete(`/api/SideActivities/Delete?id=${id}`);

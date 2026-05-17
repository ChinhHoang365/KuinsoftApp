import axios from 'services/axios.customize';

// ─── CLASSES ──────────────────────────────────────────────────────────
export const getClassByLocationAPI = (locationID: number) => {
    const urlBackend = `/api/Classes/ClassByLocation?locationID=${locationID}`;
    return axios.get(urlBackend);
};

export const getClassInfoAPI = (classID: number) => {
    const urlBackend = `/api/Classes/ClassInfo?classID=${classID}`;
    return axios.get(urlBackend);
};

export const getClassOverviewAPI = (classID: number) => {
    const urlBackend = `/api/Classes/ClassOverview?classID=${classID}`;
    return axios.get(urlBackend);
};

export const getClassesAPI = (params?: any) => {
    const urlBackend = '/api/Classes/ClassByLocation';
    return axios.get(urlBackend, { params });
};

export const createClassAPI = (data: any) => {
    const urlBackend = '/api/Classes/CreateClass';
    return axios.post(urlBackend, data);
};

export const updateClassAPI = (data: any) => {
    const urlBackend = '/api/Classes/UpdateClass';
    return axios.put(urlBackend, data);
};

export const getClassScheduleAPI = (classID: number) => {
    const urlBackend = `/api/Classes/ClassSchedule/Schedule?classID=${classID}`;
    return axios.get(urlBackend);
};

export const getClassScheduleByDateAPI = (date: string, locationID: number) => {
    const urlBackend = `/api/Classes/ClassSchedule/ScheduleByDate?date=${date}&locationID=${locationID}`;
    return axios.get(urlBackend);
};

export const getProgrammesAPI = () => {
    const urlBackend = '/api/Classes/Programmes';
    return axios.get(urlBackend);
};

export const getLevelsByProgrammeAPI = (programmeID: number) => {
    const urlBackend = `/api/Classes/Levels/LevelsByProgramme?programmeID=${programmeID}`;
    return axios.get(urlBackend);
};

export const getClassShiftsAPI = () => {
    const urlBackend = '/api/Classes/Shifts';
    return axios.get(urlBackend);
};

export const getClassStatusAPI = () => {
    const urlBackend = '/api/Classes/ClassStatus';
    return axios.get(urlBackend);
};

export const getClassRoomsAPI = () => {
    const urlBackend = '/api/Classes/Room';
    return axios.get(urlBackend);
};

export const getDayOfWeekAPI = () => {
    const urlBackend = '/api/Classes/DayOfWeek';
    return axios.get(urlBackend);
};

export const getClassAttendanceAPI = (classID: number, scheduleID: number) => {
    const urlBackend = `/api/Classes/Attendance?classID=${classID}&scheduleID=${scheduleID}`;
    return axios.get(urlBackend);
};

export const getClassFeedbackAPI = (classID: number) => {
    const urlBackend = `/api/Classes/Feedback?classID=${classID}`;
    return axios.get(urlBackend);
};

export const quickSearchClassAPI = (data: any) => {
    const urlBackend = '/api/Classes/QuickSearchClass';
    return axios.post(urlBackend, data);
};

// ─── ROOMS ────────────────────────────────────────────────────────────
export const getRoomsByLocationAndDateAPI = (locationID: number, date: string) => {
    const urlBackend = `/api/Rooms/by-LocationAndDate?locationID=${locationID}&date=${date}`;
    return axios.get(urlBackend);
};

export const getFreeRoomsAPI = (params?: any) => {
    const urlBackend = '/api/Rooms/free';
    return axios.get(urlBackend, { params });
};

export const getNotRegisteredRoomsAPI = (params?: any) => {
    const urlBackend = '/api/Rooms/not-register';
    return axios.get(urlBackend, { params });
};

// ─── MAKE-UP LESSONS ──────────────────────────────────────────────────
export const getMakeUpLessonsAPI = () => {
    const urlBackend = '/api/MakeUpLesson/GetList';
    return axios.get(urlBackend);
};

export const getMakeUpLessonByIdAPI = (id: number) => {
    const urlBackend = `/api/MakeUpLesson/GetByID?id=${id}`;
    return axios.get(urlBackend);
};

export const createMakeUpLessonAPI = (data: any) => {
    const urlBackend = '/api/MakeUpLesson/Create';
    return axios.post(urlBackend, data);
};

export const updateMakeUpLessonAPI = (data: any) => {
    const urlBackend = '/api/MakeUpLesson/Update';
    return axios.put(urlBackend, data);
};

export const deleteMakeUpLessonAPI = (id: number) => {
    const urlBackend = `/api/MakeUpLesson/Delete?id=${id}`;
    return axios.delete(urlBackend);
};

export const getMakeUpLessonProgramListAPI = () => {
    const urlBackend = '/api/MakeUpLesson/ProgramList';
    return axios.get(urlBackend);
};

// ─── COURSES (via Classes Programmes) ─────────────────────────────────
export const getCoursesAPI = () => {
    const urlBackend = '/api/Classes/Programmes';
    return axios.get(urlBackend);
};

export const getProgrammesByDepartmentAPI = (departmentID: number) => {
    const urlBackend = `/api/Classes/Programmes/ProgrammesByDeparment?departmentID=${departmentID}`;
    return axios.get(urlBackend);
};

// ─── SIDE ACTIVITIES ──────────────────────────────────────────────────
export const getSideActivitiesAPI = (params?: any) => {
    const urlBackend = '/api/SideActivities/Search';
    return axios.get(urlBackend, { params });
};

export const getSideActivitiesByStudentAPI = (studentID: number) => {
    const urlBackend = `/api/SideActivities/ListByStudent?studentID=${studentID}`;
    return axios.get(urlBackend);
};

export const getSideActivitiesTypesAPI = () => {
    const urlBackend = '/api/SideActivities/ListType';
    return axios.get(urlBackend);
};

export const getSideActivityByIdAPI = (id: number) => {
    const urlBackend = `/api/SideActivities/GetByID?id=${id}`;
    return axios.get(urlBackend);
};

export const deleteSideActivityAPI = (id: number) => {
    const urlBackend = `/api/SideActivities/Delete?id=${id}`;
    return axios.delete(urlBackend);
};

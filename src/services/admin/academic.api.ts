import axios from 'services/axios.customize';

// ─── TEST RESULTS ────────────────────────────────────────────────────
export const getTestResultsByClassAPI = (classID: number) => {
    const urlBackend = `/api/TestResult/GetListByClass?classID=${classID}`;
    return axios.get(urlBackend);
};

export const createTestResultAPI = (data: any) => {
    const urlBackend = '/api/TestResult/Create';
    return axios.post(urlBackend, data);
};

export const updateTestResultAPI = (data: any) => {
    const urlBackend = '/api/TestResult/Edit';
    return axios.put(urlBackend, data);
};

// ─── MONTHLY COMMENTS ────────────────────────────────────────────────
export const getMonthlyCommentsByClassAPI = (classID: number) => {
    const urlBackend = `/api/MonthlyComment/GetListByClass?classID=${classID}`;
    return axios.get(urlBackend);
};

export const addMonthlyCommentAPI = (data: any) => {
    const urlBackend = '/api/MonthlyComment/AddComment';
    return axios.post(urlBackend, data);
};

// ─── MAKE UP LESSONS ─────────────────────────────────────────────────
export const getMakeUpLessonsAPI = () => {
    const urlBackend = '/api/MakeUpLesson/GetList';
    return axios.get(urlBackend);
};

export const createMakeUpLessonAPI = (data: any) => {
    const urlBackend = '/api/MakeUpLesson/Create';
    return axios.post(urlBackend, data);
};

// ─── ACHIEVEMENTS & REWARDS ──────────────────────────────────────────
export const getRewardTypeListAPI = () => {
    const urlBackend = '/api/AchievementReward/GetTypeList';
    return axios.get(urlBackend);
};

export const createRewardAPI = (data: any) => {
    const urlBackend = '/api/AchievementReward/CreateReward';
    return axios.post(urlBackend, data);
};

export const getRewardsByStudentAPI = (studentID: number) => {
    const urlBackend = `/api/AchievementReward/ByStudent?studentID=${studentID}`;
    return axios.get(urlBackend);
};

// ─── SIDE ACTIVITIES ─────────────────────────────────────────────────
export const getSideActivitiesAPI = (params: any) => {
    const urlBackend = '/api/SideActivities/Search';
    return axios.get(urlBackend, { params });
};

export const createSideActivityAPI = (data: any) => {
    const urlBackend = '/api/SideActivities/Create';
    return axios.post(urlBackend, data);
};

// ─── COURSES & DEPARTMENTS ───────────────────────────────────────────
export const getDepartmentsAPI = () => {
    const urlBackend = '/api/Courses/Department';
    return axios.get(urlBackend);
};

export const getProgrammesByDeptAPI = (deptID: number) => {
    const urlBackend = `/api/Courses/Programme/ProgrammeByDepartment?departmentID=${deptID}`;
    return axios.get(urlBackend);
};

export const getCourseOverviewAPI = (deptID: number) => {
    const urlBackend = `/api/Courses/CourseOverview?deptID=${deptID}`;
    return axios.get(urlBackend);
};

// ─── ROOMS ───────────────────────────────────────────────────────────
export const getFreeRoomsAPI = (params: any) => {
    const urlBackend = '/api/Rooms/free';
    return axios.get(urlBackend, { params });
};

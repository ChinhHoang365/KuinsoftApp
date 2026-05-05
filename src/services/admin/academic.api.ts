import axios from '../axios.customize';

// ─── TEST RESULTS ────────────────────────────────────────────────────
export const getTestResultsByClassAPI = (classID: number) =>
    axios.get(`/api/TestResult/GetListByClass?classID=${classID}`);

export const createTestResultAPI = (data: any) =>
    axios.post('/api/TestResult/Create', data);

export const updateTestResultAPI = (data: any) =>
    axios.put('/api/TestResult/Edit', data);

// ─── MONTHLY COMMENTS ────────────────────────────────────────────────
export const getMonthlyCommentsByClassAPI = (classID: number) =>
    axios.get(`/api/MonthlyComment/GetListByClass?classID=${classID}`);

export const addMonthlyCommentAPI = (data: any) =>
    axios.post('/api/MonthlyComment/AddComment', data);

// ─── MAKE UP LESSONS ─────────────────────────────────────────────────
export const getMakeUpLessonsAPI = () =>
    axios.get('/api/MakeUpLesson/GetList');

export const createMakeUpLessonAPI = (data: any) =>
    axios.post('/api/MakeUpLesson/Create', data);

// ─── ACHIEVEMENTS & REWARDS ──────────────────────────────────────────
export const getRewardTypeListAPI = () =>
    axios.get('/api/AchievementReward/GetTypeList');

export const createRewardAPI = (data: any) =>
    axios.post('/api/AchievementReward/CreateReward', data);

export const getRewardsByStudentAPI = (studentID: number) =>
    axios.get(`/api/AchievementReward/ByStudent?studentID=${studentID}`);

// ─── SIDE ACTIVITIES ─────────────────────────────────────────────────
export const getSideActivitiesAPI = (params: any) =>
    axios.get('/api/SideActivities/Search', { params });

export const createSideActivityAPI = (data: any) =>
    axios.post('/api/SideActivities/Create', data);

// ─── COURSES & DEPARTMENTS ───────────────────────────────────────────
export const getDepartmentsAPI = () =>
    axios.get('/api/Courses/Department');

export const getProgrammesByDeptAPI = (deptID: number) =>
    axios.get(`/api/Courses/Programme/ProgrammeByDepartment?departmentID=${deptID}`);

export const getCourseOverviewAPI = (deptID: number) =>
    axios.get(`/api/Courses/CourseOverview?deptID=${deptID}`);

// ─── ROOMS ───────────────────────────────────────────────────────────
export const getFreeRoomsAPI = (params: any) =>
    axios.get('/api/Rooms/free', { params });

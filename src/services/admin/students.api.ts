import axios from '../axios.customize';

// ─── STUDENTS CORE & SEARCH ──────────────────────────────────────────
export const searchStudentsAPI = (params?: any) =>
    axios.get('/api/Students/StudentSearch', { params });

export const getStudentProfileAPI = (userID: number) =>
    axios.get(`/api/Students/StudentProfile?userID=${userID}`);

export const getStudentProfileViewAPI = (studentID: number) =>
    axios.get(`/api/Students/GetStudentProfileView?studentID=${studentID}`);

export const getStudentsByCenterAPI = (locationIds: string) =>
    axios.get(`/api/Students/ByCenterID?locationIds=${locationIds}`);

export const getStudentsByClassAPI = (classID: number) =>
    axios.get(`/api/Students/StudentByClasses?classID=${classID}`);

// ─── STUDENT PROFILE 360 (DETAILED) ──────────────────────────────────
export const getStudentInformationAPI = (stu_userID: number) =>
    axios.get(`/api/StudentProfile/Information?stu_userID=${stu_userID}`);

export const getStudentRelativeAPI = (stu_userID: number) =>
    axios.get(`/api/StudentProfile/Relative?stu_userID=${stu_userID}`);

export const getStudentAccountAPI = (stu_userID: number) =>
    axios.get(`/api/StudentProfile/StudentAccount?stu_userID=${stu_userID}`);

export const getStudentTelesalesInfoAPI = (stu_userID: number) =>
    axios.get(`/api/StudentProfile/TelesalesInfo?stu_userID=${stu_userID}`);

export const getStudentWaitingListAPI = (stu_userID: number) =>
    axios.get(`/api/StudentProfile/WaitingList?stu_userID=${stu_userID}`);

export const getStudentPlacementTestAPI = (stu_userID: number) =>
    axios.get(`/api/StudentProfile/PlacementTest?stu_userID=${stu_userID}`);

export const getStudentReferralAPI = (stu_userID: number) =>
    axios.get(`/api/StudentProfile/Referral?stu_userID=${stu_userID}`);

export const getStudentEmailSMSHistoryAPI = (stu_userID: number) =>
    axios.get(`/api/StudentProfile/EmalSMS?stu_userID=${stu_userID}`);

// ─── REGISTRATION & CLASSES ──────────────────────────────────────────
export const getStudentRegistrationAPI = (studentID: number) =>
    axios.get(`/api/Students/Registration?studentID=${studentID}`);

export const getStudentClassRegistedAPI = (studentID: number) =>
    axios.get(`/api/Students/ClassRegisted?studentID=${studentID}`);

export const getStudentListClassStudyingAPI = (studentID: number) =>
    axios.get(`/api/Students/ListClassStudying?studentID=${studentID}`);

export const getRegisteredCoursesAPI = (stu_userID: number) =>
    axios.get(`/api/StudentProfile/RegisteredCourse?stu_userID=${stu_userID}`);

export const getStudentProgrammeRegistedAPI = (studentID: number) =>
    axios.get(`/api/Students/ProgrammeRegistedByStudents?studentID=${studentID}`);

export const getStudentCourseRegistedDetailsAPI = (studentID: number) =>
    axios.get(`/api/Students/StudentCourseRegistedDetails?studentID=${studentID}`);

export const getStudentsOfClassRegistrationAPI = (classID: number) =>
    axios.get(`/api/Students/Registration/ListStudentOfClass?classID=${classID}`);

// ─── SCHEDULE & ATTENDANCE ───────────────────────────────────────────
export const getStudentScheduleAPI = (studentID: number) =>
    axios.get(`/api/Students/StudentSchedule?studentID=${studentID}`);

export const getStudentRegistedScheduleAPI = (studentID: number) =>
    axios.get(`/api/Students/RegistedSchedule?studentID=${studentID}`);

export const getStudentScheduleReportsAPI = (params?: any) =>
    axios.get('/api/Students/StudentScheduleReports', { params });

export const updateStudentAttendanceNoteAPI = (data: any) =>
    axios.put('/api/Students/StudentAttendanceUpdateNote', data);

export const updateStudentHomeworkNoteAPI = (data: any) =>
    axios.put('/api/Students/StudentHomeworkUpdateNote', data);

// ─── PAYMENT HISTORY (PROFILE SPECIFIC) ──────────────────────────────
export const getStudentPaymentOverallAPI = (stu_userID: number) =>
    axios.get(`/api/StudentProfile/PaymentHistory/GetOverall?stu_userID=${stu_userID}`);

export const getStudentPaymentListAPI = (stu_userID: number) =>
    axios.get(`/api/StudentProfile/PaymentHistory/GetPaymentList?stu_userID=${stu_userID}`);

export const getStudentListOfClassPaymentAPI = (stu_userID: number) =>
    axios.get(`/api/StudentProfile/PaymentHistory/GetListOfClass?stu_userID=${stu_userID}`);

export const getStudentAllocationDetailAPI = (stu_userID: number) =>
    axios.get(`/api/StudentProfile/PaymentHistory/GetAllocationDetail?stu_userID=${stu_userID}`);

export const setStudentPaymentHistoryViewAPI = (data: { stu_userID: number; viewPaymentHistory: boolean }) =>
    axios.put('/api/StudentProfile/PaymentHistory/SetView', data);

// ─── WISH LIST & PATHWAYS ────────────────────────────────────────────
export const getWishListAPI = (params?: any) =>
    axios.get('/api/Students/WishList', { params });

export const getWishListFullAPI = () =>
    axios.get('/api/Students/WishList/List');

export const createWishListAPI = (data: any) =>
    axios.put('/api/Students/CreateWishList', data);

export const deleteWishListAPI = (id: number) =>
    axios.delete(`/api/Students/DeleteWishList?id=${id}`);

export const getStudentPathwaysAPI = (studentID: number) =>
    axios.get(`/api/Students/GetStudyPathway?studentID=${studentID}`);

export const addStudentPathwayAPI = (data: any) =>
    axios.post('/api/Students/StudentPathways/Add', data);

export const updateStudentPathwayAPI = (data: any) =>
    axios.put('/api/Students/StudentPathways/Update', data);

export const deleteStudentPathwayAPI = (id: number) =>
    axios.delete(`/api/Students/StudentPathways/Delete?id=${id}`);

// ─── MASTER DATA ─────────────────────────────────────────────────────
export const getStudentChannelsAPI = () => axios.get('/api/Students/Channels');
export const getCustomerGroupsAPI = () => axios.get('/api/Students/CustomerGroups');
export const getCustomerTypesAPI = () => axios.get('/api/Students/CustomerTypes');
export const getStudentGuardiansAPI = (studentID: number) => axios.get(`/api/Students/Guardians?studentID=${studentID}`);
export const getOccupationsAPI = () => axios.get('/api/Students/Occupations');
export const getPayStatusAPI = () => axios.get('/api/Students/PayStatus');
export const getStudyPurposeAPI = () => axios.get('/api/Students/StudyPurpose');
export const getRelativeTypesAPI = () => axios.get('/api/Students/RelativeTypes');
export const getStudentSourcesAPI = () => axios.get('/api/Students/Sources');
export const getStudentSourceTypesAPI = () => axios.get('/api/Students/SourceTypes');

// ─── LEGACY / COMPATIBILITY (RE-ADDED) ──────────────────────────────
export const getMonthlyCommentByClassAPI = (classID: number) =>
    axios.get(`/api/MonthlyComment/GetListByClass?classID=${classID}`);

export const addMonthlyCommentAPI = (data: any) =>
    axios.post('/api/MonthlyComment/AddComment', data);

export const getTestResultByClassAPI = (classID: number) =>
    axios.get(`/api/TestResult/GetListByClass?classID=${classID}`);

export const getFeedbacksByStudentAPI = (studentID: number) =>
    axios.get(`/api/Feedbacks/generals/by-student?studentID=${studentID}`);

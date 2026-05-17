import axios from 'services/axios.customize';

// ─── STUDENTS CORE & SEARCH ──────────────────────────────────────────
export const searchStudentsAPI = (params?: any) => {
    const urlBackend = '/api/Students/StudentSearch';
    return axios.get(urlBackend, { params });
};

export const getStudentProfileAPI = (userID: number) => {
    const urlBackend = `/api/Students/StudentProfile?userID=${userID}`;
    return axios.get(urlBackend);
};

export const getStudentProfileViewAPI = (studentID: number) => {
    const urlBackend = `/api/Students/GetStudentProfileView?studentID=${studentID}`;
    return axios.get(urlBackend);
};

export const getStudentsByCenterAPI = (locationIds: string) => {
    const urlBackend = `/api/Students/ByCenterID?locationIds=${locationIds}`;
    return axios.get(urlBackend);
};

export const getStudentsByClassAPI = (classID: number) => {
    const urlBackend = `/api/Students/StudentByClasses?classID=${classID}`;
    return axios.get(urlBackend);
};

// ─── STUDENT PROFILE 360 (DETAILED) ──────────────────────────────────
export const getStudentInformationAPI = (stu_userID: number) => {
    const urlBackend = `/api/StudentProfile/Information?stu_userID=${stu_userID}`;
    return axios.get(urlBackend);
};

export const getStudentRelativeAPI = (stu_userID: number) => {
    const urlBackend = `/api/StudentProfile/Relative?stu_userID=${stu_userID}`;
    return axios.get(urlBackend);
};

export const getStudentAccountAPI = (stu_userID: number) => {
    const urlBackend = `/api/StudentProfile/StudentAccount?stu_userID=${stu_userID}`;
    return axios.get(urlBackend);
};

export const getStudentTelesalesInfoAPI = (stu_userID: number) => {
    const urlBackend = `/api/StudentProfile/TelesalesInfo?stu_userID=${stu_userID}`;
    return axios.get(urlBackend);
};

export const getStudentWaitingListAPI = (stu_userID: number) => {
    const urlBackend = `/api/StudentProfile/WaitingList?stu_userID=${stu_userID}`;
    return axios.get(urlBackend);
};

export const getStudentPlacementTestAPI = (stu_userID: number) => {
    const urlBackend = `/api/StudentProfile/PlacementTest?stu_userID=${stu_userID}`;
    return axios.get(urlBackend);
};

export const getStudentReferralAPI = (stu_userID: number) => {
    const urlBackend = `/api/StudentProfile/Referral?stu_userID=${stu_userID}`;
    return axios.get(urlBackend);
};

export const getStudentEmailSMSHistoryAPI = (stu_userID: number) => {
    const urlBackend = `/api/StudentProfile/EmalSMS?stu_userID=${stu_userID}`;
    return axios.get(urlBackend);
};

// ─── REGISTRATION & CLASSES ──────────────────────────────────────────
export const getStudentRegistrationAPI = (studentID: number) => {
    const urlBackend = `/api/Students/Registration?studentID=${studentID}`;
    return axios.get(urlBackend);
};

export const getStudentClassRegistedAPI = (studentID: number) => {
    const urlBackend = `/api/Students/ClassRegisted?studentID=${studentID}`;
    return axios.get(urlBackend);
};

export const getStudentListClassStudyingAPI = (studentID: number) => {
    const urlBackend = `/api/Students/ListClassStudying?studentID=${studentID}`;
    return axios.get(urlBackend);
};

export const getRegisteredCoursesAPI = (stu_userID: number) => {
    const urlBackend = `/api/StudentProfile/RegisteredCourse?stu_userID=${stu_userID}`;
    return axios.get(urlBackend);
};

export const getStudentProgrammeRegistedAPI = (studentID: number) => {
    const urlBackend = `/api/Students/ProgrammeRegistedByStudents?studentID=${studentID}`;
    return axios.get(urlBackend);
};

export const getStudentCourseRegistedDetailsAPI = (studentID: number) => {
    const urlBackend = `/api/Students/StudentCourseRegistedDetails?studentID=${studentID}`;
    return axios.get(urlBackend);
};

export const getStudentsOfClassRegistrationAPI = (classID: number) => {
    const urlBackend = `/api/Students/Registration/ListStudentOfClass?classID=${classID}`;
    return axios.get(urlBackend);
};

// ─── SCHEDULE & ATTENDANCE ───────────────────────────────────────────
export const getStudentScheduleAPI = (studentID: number) => {
    const urlBackend = `/api/Students/StudentSchedule?studentID=${studentID}`;
    return axios.get(urlBackend);
};

export const getStudentRegistedScheduleAPI = (studentID: number) => {
    const urlBackend = `/api/Students/RegistedSchedule?studentID=${studentID}`;
    return axios.get(urlBackend);
};

export const getStudentScheduleReportsAPI = (params?: any) => {
    const urlBackend = '/api/Students/StudentScheduleReports';
    return axios.get(urlBackend, { params });
};

export const updateStudentAttendanceNoteAPI = (data: any) => {
    const urlBackend = '/api/Students/StudentAttendanceUpdateNote';
    return axios.put(urlBackend, data);
};

export const updateStudentHomeworkNoteAPI = (data: any) => {
    const urlBackend = '/api/Students/StudentHomeworkUpdateNote';
    return axios.put(urlBackend, data);
};

// ─── PAYMENT HISTORY (PROFILE SPECIFIC) ──────────────────────────────
export const getStudentPaymentOverallAPI = (stu_userID: number) => {
    const urlBackend = `/api/StudentProfile/PaymentHistory/GetOverall?stu_userID=${stu_userID}`;
    return axios.get(urlBackend);
};

export const getStudentPaymentListAPI = (stu_userID: number) => {
    const urlBackend = `/api/StudentProfile/PaymentHistory/GetPaymentList?stu_userID=${stu_userID}`;
    return axios.get(urlBackend);
};

export const getStudentListOfClassPaymentAPI = (stu_userID: number) => {
    const urlBackend = `/api/StudentProfile/PaymentHistory/GetListOfClass?stu_userID=${stu_userID}`;
    return axios.get(urlBackend);
};

export const getStudentAllocationDetailAPI = (stu_userID: number) => {
    const urlBackend = `/api/StudentProfile/PaymentHistory/GetAllocationDetail?stu_userID=${stu_userID}`;
    return axios.get(urlBackend);
};

export const setStudentPaymentHistoryViewAPI = (data: { stu_userID: number; viewPaymentHistory: boolean }) => {
    const urlBackend = '/api/StudentProfile/PaymentHistory/SetView';
    return axios.put(urlBackend, data);
};

// ─── WISH LIST & PATHWAYS ────────────────────────────────────────────
export const getWishListAPI = (params?: any) => {
    const urlBackend = '/api/Students/WishList';
    return axios.get(urlBackend, { params });
};

export const getWishListFullAPI = () => {
    const urlBackend = '/api/Students/WishList/List';
    return axios.get(urlBackend);
};

export const createWishListAPI = (data: any) => {
    const urlBackend = '/api/Students/CreateWishList';
    return axios.put(urlBackend, data);
};

export const deleteWishListAPI = (id: number) => {
    const urlBackend = `/api/Students/DeleteWishList?id=${id}`;
    return axios.delete(urlBackend);
};

export const getStudentPathwaysAPI = (studentID: number) => {
    const urlBackend = `/api/Students/GetStudyPathway?studentID=${studentID}`;
    return axios.get(urlBackend);
};

export const addStudentPathwayAPI = (data: any) => {
    const urlBackend = '/api/Students/StudentPathways/Add';
    return axios.post(urlBackend, data);
};

export const updateStudentPathwayAPI = (data: any) => {
    const urlBackend = '/api/Students/StudentPathways/Update';
    return axios.put(urlBackend, data);
};

export const deleteStudentPathwayAPI = (id: number) => {
    const urlBackend = `/api/Students/StudentPathways/Delete?id=${id}`;
    return axios.delete(urlBackend);
};

// ─── MASTER DATA ─────────────────────────────────────────────────────
export const getStudentChannelsAPI = () => {
    const urlBackend = '/api/Students/Channels';
    return axios.get(urlBackend);
};
export const getCustomerGroupsAPI = () => {
    const urlBackend = '/api/Students/CustomerGroups';
    return axios.get(urlBackend);
};
export const getCustomerTypesAPI = () => {
    const urlBackend = '/api/Students/CustomerTypes';
    return axios.get(urlBackend);
};
export const getStudentGuardiansAPI = (studentID: number) => {
    const urlBackend = `/api/Students/Guardians?studentID=${studentID}`;
    return axios.get(urlBackend);
};
export const getOccupationsAPI = () => {
    const urlBackend = '/api/Students/Occupations';
    return axios.get(urlBackend);
};
export const getPayStatusAPI = () => {
    const urlBackend = '/api/Students/PayStatus';
    return axios.get(urlBackend);
};
export const getStudyPurposeAPI = () => {
    const urlBackend = '/api/Students/StudyPurpose';
    return axios.get(urlBackend);
};
export const getRelativeTypesAPI = () => {
    const urlBackend = '/api/Students/RelativeTypes';
    return axios.get(urlBackend);
};
export const getStudentSourcesAPI = () => {
    const urlBackend = '/api/Students/Sources';
    return axios.get(urlBackend);
};
export const getStudentSourceTypesAPI = () => {
    const urlBackend = '/api/Students/SourceTypes';
    return axios.get(urlBackend);
};

// ─── LEGACY / COMPATIBILITY (RE-ADDED) ──────────────────────────────
export const getMonthlyCommentByClassAPI = (classID: number) => {
    const urlBackend = `/api/MonthlyComment/GetListByClass?classID=${classID}`;
    return axios.get(urlBackend);
};

export const addMonthlyCommentAPI = (data: any) => {
    const urlBackend = '/api/MonthlyComment/AddComment';
    return axios.post(urlBackend, data);
};

export const getTestResultByClassAPI = (classID: number) => {
    const urlBackend = `/api/TestResult/GetListByClass?classID=${classID}`;
    return axios.get(urlBackend);
};

export const getFeedbacksByStudentAPI = (studentID: number) => {
    const urlBackend = `/api/Feedbacks/generals/by-student?studentID=${studentID}`;
    return axios.get(urlBackend);
};

// ───── ADMIN SYSTEM MANAGEMENT APIS ─────────────────────────────────

// User Management
export * from '../admin/users.api';

// Students
export * from '../admin/students.api';

// Training & Classes
export * from '../admin/training.api';
export {
    getClassesByLocationAPI,
    getAttendanceAPI,
    updateStudentAttendancesAPI,
    getStudentDiligentsAPI,
    getTeacherScheduleAPI,
    getDailyAbsentTeachersAPI,
    substituteTeacherOverviewAPI,
    getClassChatSearchAPI,
    sendChatToStudentsAPI,
    getClassTypesAPI,
    getRoomsAPI,
    getShiftsAPI,
    getLevelsAPI,
} from '../admin/classes.api';
export * from '../admin/recording.api';

// HR Management
export * from '../admin/hr.api';

// Finance
export * from '../admin/finance.api';

// Utilities
export * from '../admin/announcements.api';
export * from '../admin/news.api';
export * from '../admin/tasks.api';
export {
    getAnnouncementByIdAPI,
    getLibraryByTypeAPI,
    getAllLibraryFoldersAPI,
    getLibraryByFolderAPI,
    getLibraryByReferenceIdAPI,
    createLibraryAPI,
    updateLibraryAPI,
    deleteLibraryAPI,
    createLibraryFolderAPI,
    getBookInventoryByPOAPI,
    getCourseMaterialCheckListAPI,
    getCourseMaterialByStudentAPI,
    getClassMaterialStatusAPI,
    getTaskByIdAPI,
    getTaskByTeacherAPI,
    getTaskCategoriesAPI,
    createTaskAPI,
    updateTaskAPI,
    deleteTaskAPI,
    getAchievementRewardsByStudentAPI,
    getAchievementRewardsByClassAPI,
    searchAchievementRewardsAPI,
    getAchievementTypesAPI,
    createAchievementRewardAPI,
    updateAchievementRewardAPI,
    deleteAchievementRewardAPI,
} from '../admin/utilities.api';
export * from '../admin/reference.api';
export * from '../admin/reports.api';
export * from '../admin/notification.api';

// System & Settings
export * from '../admin/center.api';
export {
    getCentersAPI,
    getCenterDetailAPI,
    getUserByRoleAPI as getCenterDetailUserByRoleAPI,
    getFunctionsAPI,
    getGroupFunctionAPI,
} from '../admin/centerDetails.api';
export * from '../admin/geography.api';
export {
    feedbackToStudentsAPI,
    feedbackToClassAPI,
    getFeedbacksByQCAPI,
    getFeedbackInfoAPI,
    getFeedbackByAdminAPI,
    updateFeedbackStatusAPI,
    deleteGeneralFeedbackAPI,
    getFeedbackGeneralByUserAndClassAPI,
    createFeedbackDetailAPI,
    addNewFeedbackDetailAPI,
    updateFeedbackDetailAPI,
    updateFBDetailAPI,
    deleteFeedbackDetailAPI,
    findFeedbackDetailsAPI,
} from '../admin/feedbacks.api';

// Academic & Logistics
export {
    getTestResultsByClassAPI,
    createTestResultAPI,
    updateTestResultAPI,
    getMonthlyCommentsByClassAPI,
    getRewardTypeListAPI,
    createRewardAPI,
    getRewardsByStudentAPI,
    getDepartmentsAPI,
    getProgrammesByDeptAPI,
    getCourseOverviewAPI,
} from '../admin/academic.api';
export * from '../admin/administration.api';
export * from '../admin/inventory.api';

// Upload & Maintenance
export * from '../admin/upload.api';
export * from '../admin/cronjob.api';

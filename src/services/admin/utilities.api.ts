import axios from '../axios.customize';

// ─── NEWS ─────────────────────────────────────────────────────────────
export const getAdminNewsListAPI = (params?: any) =>
    axios.get('/api/News/Admin/NewsList', { params });

export const getUserNewsListAPI = (params?: any) =>
    axios.get('/api/News/User/NewsList', { params });

export const getNewsDetailAPI = (newsID: number) =>
    axios.get(`/api/News/NewsDetail?newsID=${newsID}`);

export const createNewsAPI = (data: any) =>
    axios.post('/api/News/CreateNews', data);

export const updateNewsAPI = (data: any) =>
    axios.put('/api/News/UpdateNews', data);

export const deleteNewsAPI = (newsID: number) =>
    axios.delete(`/api/News/DeleteNews?newsID=${newsID}`);

// ─── ANNOUNCEMENT ─────────────────────────────────────────────────────
export const getAllAnnouncementsAPI = (params?: any) =>
    axios.get('/api/Announcement/getAllAnnouncement', { params });

export const getAnnouncementByIdAPI = (id: number) =>
    axios.get(`/api/Announcement/getAnnouncemnentByID?id=${id}`);

export const createAnnouncementAPI = (data: any) =>
    axios.post('/api/Announcement/createAnnouncement', data);

export const updateAnnouncementAPI = (data: any) =>
    axios.put('/api/Announcement/updateAnnouncement', data);

export const cancelAnnouncementAPI = (id: number) =>
    axios.put(`/api/Announcement/cancel?id=${id}`);

export const deleteAnnouncementAPI = (id: number) =>
    axios.delete(`/api/Announcement/deleteByAnnouncemnentID?id=${id}`);

export const getAllTemplatesAPI = () =>
    axios.get('/api/AnnouncementTemplate/getAllTemplate');

export const getAnnouncementTagsAPI = () =>
    axios.get('/api/AnnouncementTag/getAnnounTags');

// ─── REFERENCE LIBRARY ────────────────────────────────────────────────
export const getLibraryByTypeAPI = (libraryType: string) =>
    axios.get(`/api/ReferenceLibrary/Folder/Find-by-libraryType?libraryType=${libraryType}`);

export const getAllLibraryFoldersAPI = (libraryType: string) =>
    axios.get(`/api/ReferenceLibrary/Folder/All-by-libraryType?libraryType=${libraryType}`);

export const getLibraryByFolderAPI = (folderID: number) =>
    axios.get(`/api/ReferenceLibrary/Find-by-libraryFolderID?libraryFolderID=${folderID}`);

export const getLibraryByReferenceIdAPI = (referenceID: number) =>
    axios.get(`/api/ReferenceLibrary/Find-by-ReferenceID?referenceID=${referenceID}`);

export const createLibraryAPI = (data: any) =>
    axios.post('/api/ReferenceLibrary/Create', data);

export const updateLibraryAPI = (data: any) =>
    axios.put('/api/ReferenceLibrary/Update', data);

export const deleteLibraryAPI = (id: number) =>
    axios.delete(`/api/ReferenceLibrary/Delete?id=${id}`);

export const createLibraryFolderAPI = (data: any) =>
    axios.post('/api/ReferenceLibrary/Folder/Create', data);

// ─── BOOK STORAGE ─────────────────────────────────────────────────────
export const getBookInventoryByPOAPI = (params?: any) =>
    axios.get('/api/BookStorage/getInventoryDetailByPO', { params });

export const getCourseMaterialCheckListAPI = (params?: any) =>
    axios.get('/api/BookStorage/getCourseMaterialCheckList', { params });

export const getCourseMaterialByStudentAPI = (studentID: number) =>
    axios.get(`/api/BookStorage/getCourseMaterialDeliveryByStudent?studentID=${studentID}`);

export const getClassMaterialStatusAPI = (classID: number) =>
    axios.get(`/api/BookStorage/getClassMaterialStatus?classID=${classID}`);

// ─── TASKS (Appointments) ─────────────────────────────────────────────
export const getTaskByIdAPI = (appointmentID: number) =>
    axios.get(`/api/Task/AppointmentByID?appointmentID=${appointmentID}`);

export const getTaskByTeacherAPI = (teacherID: number) =>
    axios.get(`/api/Task/AppointmentByTeacherID?teacherID=${teacherID}`);

export const getTaskCategoriesAPI = () =>
    axios.get('/api/Task/APPOINTMENTCATEGORIES_List');

export const getTaskPrioritiesAPI = () =>
    axios.get('/api/Task/APPOINTMENTTASKPRIORITIES_List');

export const createTaskAPI = (data: any) =>
    axios.post('/api/Task/Appointment_Add', data);

export const updateTaskAPI = (data: any) =>
    axios.put('/api/Task/Appointment_Update', data);

export const deleteTaskAPI = (id: number) =>
    axios.delete(`/api/Task/Appointment_Delete?id=${id}`);

// ─── ACHIEVEMENT REWARD ───────────────────────────────────────────────
export const getAchievementRewardsByStudentAPI = (studentID: number) =>
    axios.get(`/api/AchievementReward/ByStudent?studentID=${studentID}`);

export const getAchievementRewardsByClassAPI = (classID: number) =>
    axios.get(`/api/AchievementReward/AchievementRewardByClass?classID=${classID}`);

export const searchAchievementRewardsAPI = (locationID: number, fromDate: string, toDate: string) =>
    axios.get(`/api/AchievementReward/SearchLocationDate?locationID=${locationID}&fromDate=${fromDate}&toDate=${toDate}`);

export const getAchievementTypesAPI = () =>
    axios.get('/api/AchievementReward/GetTypeList');

export const createAchievementRewardAPI = (data: any) =>
    axios.post('/api/AchievementReward/CreateReward', data);

export const updateAchievementRewardAPI = (data: any) =>
    axios.put('/api/AchievementReward/Update', data);

export const deleteAchievementRewardAPI = (id: number) =>
    axios.delete(`/api/AchievementReward/Delete?id=${id}`);

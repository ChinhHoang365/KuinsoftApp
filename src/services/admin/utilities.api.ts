import axios from 'services/axios.customize';

// ─── NEWS ─────────────────────────────────────────────────────────────
export const getAdminNewsListAPI = (params?: any) => {
    const urlBackend = '/api/News/Admin/NewsList';
    return axios.get(urlBackend, { params });
};

export const getUserNewsListAPI = (params?: any) => {
    const urlBackend = '/api/News/User/NewsList';
    return axios.get(urlBackend, { params });
};

export const getNewsDetailAPI = (newsID: number) => {
    const urlBackend = `/api/News/NewsDetail?newsID=${newsID}`;
    return axios.get(urlBackend);
};

export const createNewsAPI = (data: any) => {
    const urlBackend = '/api/News/CreateNews';
    return axios.post(urlBackend, data);
};

export const updateNewsAPI = (data: any) => {
    const urlBackend = '/api/News/UpdateNews';
    return axios.put(urlBackend, data);
};

export const deleteNewsAPI = (newsID: number) => {
    const urlBackend = `/api/News/DeleteNews?newsID=${newsID}`;
    return axios.delete(urlBackend);
};

// ─── ANNOUNCEMENT ─────────────────────────────────────────────────────
export const getAllAnnouncementsAPI = (params?: any) => {
    const urlBackend = '/api/Announcement/getAllAnnouncement';
    return axios.get(urlBackend, { params });
};

export const getAnnouncementByIdAPI = (id: number) => {
    const urlBackend = `/api/Announcement/getAnnouncemnentByID?id=${id}`;
    return axios.get(urlBackend);
};

export const createAnnouncementAPI = (data: any) => {
    const urlBackend = '/api/Announcement/createAnnouncement';
    return axios.post(urlBackend, data);
};

export const updateAnnouncementAPI = (data: any) => {
    const urlBackend = '/api/Announcement/updateAnnouncement';
    return axios.put(urlBackend, data);
};

export const cancelAnnouncementAPI = (id: number) => {
    const urlBackend = `/api/Announcement/cancel?id=${id}`;
    return axios.put(urlBackend);
};

export const deleteAnnouncementAPI = (id: number) => {
    const urlBackend = `/api/Announcement/deleteByAnnouncemnentID?id=${id}`;
    return axios.delete(urlBackend);
};

export const getAllTemplatesAPI = () => {
    const urlBackend = '/api/AnnouncementTemplate/getAllTemplate';
    return axios.get(urlBackend);
};

export const getAnnouncementTagsAPI = () => {
    const urlBackend = '/api/AnnouncementTag/getAnnounTags';
    return axios.get(urlBackend);
};

// ─── REFERENCE LIBRARY ────────────────────────────────────────────────
export const getLibraryByTypeAPI = (libraryType: string) => {
    const urlBackend = `/api/ReferenceLibrary/Folder/Find-by-libraryType?libraryType=${libraryType}`;
    return axios.get(urlBackend);
};

export const getAllLibraryFoldersAPI = (libraryType: string) => {
    const urlBackend = `/api/ReferenceLibrary/Folder/All-by-libraryType?libraryType=${libraryType}`;
    return axios.get(urlBackend);
};

export const getLibraryByFolderAPI = (folderID: number) => {
    const urlBackend = `/api/ReferenceLibrary/Find-by-libraryFolderID?libraryFolderID=${folderID}`;
    return axios.get(urlBackend);
};

export const getLibraryByReferenceIdAPI = (referenceID: number) => {
    const urlBackend = `/api/ReferenceLibrary/Find-by-ReferenceID?referenceID=${referenceID}`;
    return axios.get(urlBackend);
};

export const createLibraryAPI = (data: any) => {
    const urlBackend = '/api/ReferenceLibrary/Create';
    return axios.post(urlBackend, data);
};

export const updateLibraryAPI = (data: any) => {
    const urlBackend = '/api/ReferenceLibrary/Update';
    return axios.put(urlBackend, data);
};

export const deleteLibraryAPI = (id: number) => {
    const urlBackend = `/api/ReferenceLibrary/Delete?id=${id}`;
    return axios.delete(urlBackend);
};

export const createLibraryFolderAPI = (data: any) => {
    const urlBackend = '/api/ReferenceLibrary/Folder/Create';
    return axios.post(urlBackend, data);
};

// ─── BOOK STORAGE ─────────────────────────────────────────────────────
export const getBookInventoryByPOAPI = (params?: any) => {
    const urlBackend = '/api/BookStorage/getInventoryDetailByPO';
    return axios.get(urlBackend, { params });
};

export const getCourseMaterialCheckListAPI = (params?: any) => {
    const urlBackend = '/api/BookStorage/getCourseMaterialCheckList';
    return axios.get(urlBackend, { params });
};

export const getCourseMaterialByStudentAPI = (studentID: number) => {
    const urlBackend = `/api/BookStorage/getCourseMaterialDeliveryByStudent?studentID=${studentID}`;
    return axios.get(urlBackend);
};

export const getClassMaterialStatusAPI = (classID: number) => {
    const urlBackend = `/api/BookStorage/getClassMaterialStatus?classID=${classID}`;
    return axios.get(urlBackend);
};

// ─── TASKS (Appointments) ─────────────────────────────────────────────
export const getTaskByIdAPI = (appointmentID: number) => {
    const urlBackend = `/api/Task/AppointmentByID?appointmentID=${appointmentID}`;
    return axios.get(urlBackend);
};

export const getTaskByTeacherAPI = (teacherID: number) => {
    const urlBackend = `/api/Task/AppointmentByTeacherID?teacherID=${teacherID}`;
    return axios.get(urlBackend);
};

export const getTaskCategoriesAPI = () => {
    const urlBackend = '/api/Task/APPOINTMENTCATEGORIES_List';
    return axios.get(urlBackend);
};

export const getTaskPrioritiesAPI = () => {
    const urlBackend = '/api/Task/APPOINTMENTTASKPRIORITIES_List';
    return axios.get(urlBackend);
};

export const createTaskAPI = (data: any) => {
    const urlBackend = '/api/Task/Appointment_Add';
    return axios.post(urlBackend, data);
};

export const updateTaskAPI = (data: any) => {
    const urlBackend = '/api/Task/Appointment_Update';
    return axios.put(urlBackend, data);
};

export const deleteTaskAPI = (id: number) => {
    const urlBackend = `/api/Task/Appointment_Delete?id=${id}`;
    return axios.delete(urlBackend);
};

// ─── ACHIEVEMENT REWARD ───────────────────────────────────────────────
export const getAchievementRewardsByStudentAPI = (studentID: number) => {
    const urlBackend = `/api/AchievementReward/ByStudent?studentID=${studentID}`;
    return axios.get(urlBackend);
};

export const getAchievementRewardsByClassAPI = (classID: number) => {
    const urlBackend = `/api/AchievementReward/AchievementRewardByClass?classID=${classID}`;
    return axios.get(urlBackend);
};

export const searchAchievementRewardsAPI = (locationID: number, fromDate: string, toDate: string) => {
    const urlBackend = `/api/AchievementReward/SearchLocationDate?locationID=${locationID}&fromDate=${fromDate}&toDate=${toDate}`;
    return axios.get(urlBackend);
};

export const getAchievementTypesAPI = () => {
    const urlBackend = '/api/AchievementReward/GetTypeList';
    return axios.get(urlBackend);
};

export const createAchievementRewardAPI = (data: any) => {
    const urlBackend = '/api/AchievementReward/CreateReward';
    return axios.post(urlBackend, data);
};

export const updateAchievementRewardAPI = (data: any) => {
    const urlBackend = '/api/AchievementReward/Update';
    return axios.put(urlBackend, data);
};

export const deleteAchievementRewardAPI = (id: number) => {
    const urlBackend = `/api/AchievementReward/Delete?id=${id}`;
    return axios.delete(urlBackend);
};

import axios from '../axios.customize';

// ─── ANNOUNCEMENTS ───────────────────────────────────────────────────
export const getAllAnnouncementsAPI = () =>
    axios.get('/api/Announcement/getAllAnnouncement');

export const getAnnouncementByIDAPI = (id: number) =>
    axios.get(`/api/Announcement/getAnnouncemnentByID?id=${id}`);

export const createAnnouncementAPI = (data: any) =>
    axios.post('/api/Announcement/createAnnouncement', data);

export const updateAnnouncementAPI = (data: any) =>
    axios.put('/api/Announcement/updateAnnouncement', data);

export const cancelAnnouncementAPI = (id: number) =>
    axios.put(`/api/Announcement/cancel?id=${id}`);

export const deleteAnnouncementAPI = (id: number) =>
    axios.delete(`/api/Announcement/deleteByAnnouncemnentID?id=${id}`);

// ─── TEMPLATES ───────────────────────────────────────────────────────
export const getAllTemplatesAPI = () =>
    axios.get('/api/AnnouncementTemplate/getAllTemplate');

export const createTemplateAPI = (data: any) =>
    axios.post('/api/AnnouncementTemplate/createTemplate', data);

export const editTemplateAPI = (data: any) =>
    axios.put('/api/AnnouncementTemplate/editTemplate', data);

export const deleteTemplateAPI = (id: number) =>
    axios.delete(`/api/AnnouncementTemplate/deleteTemplate?id=${id}`);

// ─── TAGS & RECIPIENTS ───────────────────────────────────────────────
export const getAnnouncementTagsAPI = () =>
    axios.get('/api/AnnouncementTag/getAnnounTags');

export const editAnnouncementTagsAPI = (data: any) =>
    axios.put('/api/AnnouncementTag/editAnnounTags', data);

export const getRecipientsByClassAPI = (classIDs: string) =>
    axios.get(`/api/Announcement/Recipients/getByClassIDs?classIDs=${classIDs}`);

export const getRecipientsByLocationAPI = (locationIDs: string) =>
    axios.get(`/api/Announcement/Recipients/getByLocationIDs?locationIDs=${locationIDs}`);

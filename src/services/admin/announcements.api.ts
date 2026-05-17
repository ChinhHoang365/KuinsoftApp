import axios from 'services/axios.customize';

// ─── ANNOUNCEMENTS ───────────────────────────────────────────────────
export const getAllAnnouncementsAPI = () => {
    const urlBackend = '/api/Announcement/getAllAnnouncement';
    return axios.get(urlBackend);
};

export const getAnnouncementByIDAPI = (id: number) => {
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

// ─── TEMPLATES ───────────────────────────────────────────────────────
export const getAllTemplatesAPI = () => {
    const urlBackend = '/api/AnnouncementTemplate/getAllTemplate';
    return axios.get(urlBackend);
};

export const createTemplateAPI = (data: any) => {
    const urlBackend = '/api/AnnouncementTemplate/createTemplate';
    return axios.post(urlBackend, data);
};

export const editTemplateAPI = (data: any) => {
    const urlBackend = '/api/AnnouncementTemplate/editTemplate';
    return axios.put(urlBackend, data);
};

export const deleteTemplateAPI = (id: number) => {
    const urlBackend = `/api/AnnouncementTemplate/deleteTemplate?id=${id}`;
    return axios.delete(urlBackend);
};

// ─── TAGS & RECIPIENTS ───────────────────────────────────────────────
export const getAnnouncementTagsAPI = () => {
    const urlBackend = '/api/AnnouncementTag/getAnnounTags';
    return axios.get(urlBackend);
};

export const editAnnouncementTagsAPI = (data: any) => {
    const urlBackend = '/api/AnnouncementTag/editAnnounTags';
    return axios.put(urlBackend, data);
};

export const getRecipientsByClassAPI = (classIDs: string) => {
    const urlBackend = `/api/Announcement/Recipients/getByClassIDs?classIDs=${classIDs}`;
    return axios.get(urlBackend);
};

export const getRecipientsByLocationAPI = (locationIDs: string) => {
    const urlBackend = `/api/Announcement/Recipients/getByLocationIDs?locationIDs=${locationIDs}`;
    return axios.get(urlBackend);
};

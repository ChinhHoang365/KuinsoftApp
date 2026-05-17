import axios from 'services/axios.customize';

// ─── REFERENCE LIBRARY - FOLDERS ──────────────────────────────────────
export const createFolderAPI = (data: any) => {
    const urlBackend = '/api/ReferenceLibrary/Folder/Create';
    return axios.post(urlBackend, data);
};

export const updateFolderAPI = (data: any) => {
    const urlBackend = '/api/ReferenceLibrary/Folder/Update';
    return axios.put(urlBackend, data);
};

export const deleteFolderAPI = (id: number) => {
    const urlBackend = `/api/ReferenceLibrary/Folder/Delete?id=${id}`;
    return axios.delete(urlBackend);
};

export const findFoldersByTypeAPI = (type: string) => {
    const urlBackend = `/api/ReferenceLibrary/Folder/Find-by-libraryType?libraryType=${type}`;
    return axios.get(urlBackend);
};

export const getAllFoldersByTypeAPI = (type: string) => {
    const urlBackend = `/api/ReferenceLibrary/Folder/All-by-libraryType?libraryType=${type}`;
    return axios.get(urlBackend);
};

export const getSubFoldersAPI = (folderID: number) => {
    const urlBackend = `/api/ReferenceLibrary/SubFolder-by-libraryFolderID?libraryFolderID=${folderID}`;
    return axios.get(urlBackend);
};

// ─── REFERENCE LIBRARY - ITEMS ────────────────────────────────────────
export const createReferenceAPI = (data: any) => {
    const urlBackend = '/api/ReferenceLibrary/Create';
    return axios.post(urlBackend, data);
};

export const updateReferenceAPI = (data: any) => {
    const urlBackend = '/api/ReferenceLibrary/Update';
    return axios.put(urlBackend, data);
};

export const deleteReferenceAPI = (id: number) => {
    const urlBackend = `/api/ReferenceLibrary/Delete?id=${id}`;
    return axios.delete(urlBackend);
};

export const findReferenceByIDAPI = (id: number) => {
    const urlBackend = `/api/ReferenceLibrary/Find-by-ReferenceID?ReferenceID=${id}`;
    return axios.get(urlBackend);
};

export const findReferencesByFolderAPI = (folderID: number) => {
    const urlBackend = `/api/ReferenceLibrary/Find-by-libraryFolderID?libraryFolderID=${folderID}`;
    return axios.get(urlBackend);
};

// ─── REFERENCE LIBRARY - TAGS ─────────────────────────────────────────
export const createTagAPI = (data: any) => {
    const urlBackend = '/api/ReferenceLibrary/Tag/Create';
    return axios.post(urlBackend, data);
};

export const updateTagAPI = (data: any) => {
    const urlBackend = '/api/ReferenceLibrary/Tag/Update';
    return axios.put(urlBackend, data);
};

export const deleteTagAPI = (id: number) => {
    const urlBackend = `/api/ReferenceLibrary/Tag/Delete?id=${id}`;
    return axios.delete(urlBackend);
};

export const getTagListAPI = () => {
    const urlBackend = '/api/ReferenceLibrary/Tag/GetList';
    return axios.get(urlBackend);
};

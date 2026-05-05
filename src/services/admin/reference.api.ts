import axios from '../axios.customize';

// ─── REFERENCE LIBRARY - FOLDERS ──────────────────────────────────────
export const createFolderAPI = (data: any) =>
    axios.post('/api/ReferenceLibrary/Folder/Create', data);

export const updateFolderAPI = (data: any) =>
    axios.put('/api/ReferenceLibrary/Folder/Update', data);

export const deleteFolderAPI = (id: number) =>
    axios.delete(`/api/ReferenceLibrary/Folder/Delete?id=${id}`);

export const findFoldersByTypeAPI = (type: string) =>
    axios.get(`/api/ReferenceLibrary/Folder/Find-by-libraryType?libraryType=${type}`);

export const getAllFoldersByTypeAPI = (type: string) =>
    axios.get(`/api/ReferenceLibrary/Folder/All-by-libraryType?libraryType=${type}`);

export const getSubFoldersAPI = (folderID: number) =>
    axios.get(`/api/ReferenceLibrary/SubFolder-by-libraryFolderID?libraryFolderID=${folderID}`);

// ─── REFERENCE LIBRARY - ITEMS ────────────────────────────────────────
export const createReferenceAPI = (data: any) =>
    axios.post('/api/ReferenceLibrary/Create', data);

export const updateReferenceAPI = (data: any) =>
    axios.put('/api/ReferenceLibrary/Update', data);

export const deleteReferenceAPI = (id: number) =>
    axios.delete(`/api/ReferenceLibrary/Delete?id=${id}`);

export const findReferenceByIDAPI = (id: number) =>
    axios.get(`/api/ReferenceLibrary/Find-by-ReferenceID?ReferenceID=${id}`);

export const findReferencesByFolderAPI = (folderID: number) =>
    axios.get(`/api/ReferenceLibrary/Find-by-libraryFolderID?libraryFolderID=${folderID}`);

// ─── REFERENCE LIBRARY - TAGS ─────────────────────────────────────────
export const createTagAPI = (data: any) =>
    axios.post('/api/ReferenceLibrary/Tag/Create', data);

export const updateTagAPI = (data: any) =>
    axios.put('/api/ReferenceLibrary/Tag/Update', data);

export const deleteTagAPI = (id: number) =>
    axios.delete(`/api/ReferenceLibrary/Tag/Delete?id=${id}`);

export const getTagListAPI = () =>
    axios.get('/api/ReferenceLibrary/Tag/GetList');

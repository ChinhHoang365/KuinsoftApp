import axios from '../axios.customize';

// ─── INVENTORY - BOOK STORAGE ────────────────────────────────────────
export const getInventoryDetailByPOAPI = (params?: any) =>
    axios.get('/api/BookStorage/getInventoryDetailByPO', { params });

export const getInventoryItemStatementAPI = (params?: any) =>
    axios.get('/api/BookStorage/getInventoryItemStatement', { params });

export const getCashDetailByProductAPI = (params?: any) =>
    axios.get('/api/BookStorage/getCashDetailByProduct', { params });

export const getTransferDataAPI = (params?: any) =>
    axios.get('/api/BookStorage/getTransferData', { params });

export const getTransferDataByNbrAPI = (nbr: string) =>
    axios.get(`/api/BookStorage/getTransferDataByNbr?nbr=${nbr}`);

export const getCourseMaterialCheckListAPI = (params?: any) =>
    axios.get('/api/BookStorage/getCourseMaterialCheckList', { params });

export const getCourseMaterialDeliveryByStudentAPI = (params?: any) =>
    axios.get('/api/BookStorage/getCourseMaterialDeliveryByStudent', { params });

export const updateBookStorageStatusAPI = (data: any) =>
    axios.post('/api/BookStorage/updateStatus', data);

export const getClassMaterialStatusAPI = (params?: any) =>
    axios.get('/api/BookStorage/getClassMaterialStatus', { params });

export const getClassMaterialStatusByProductAPI = (params?: any) =>
    axios.get('/api/BookStorage/getClassMaterialStatusByProduct', { params });

export const exportMaterialDataInClassAPI = (params?: any) =>
    axios.get('/api/BookStorage/ExportMaterialDataInClass', { params });

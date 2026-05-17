import axios from 'services/axios.customize';

// ─── INVENTORY - BOOK STORAGE ────────────────────────────────────────
export const getInventoryDetailByPOAPI = (params?: any) => {
    const urlBackend = '/api/BookStorage/getInventoryDetailByPO';
    return axios.get(urlBackend, { params });
};

export const getInventoryItemStatementAPI = (params?: any) => {
    const urlBackend = '/api/BookStorage/getInventoryItemStatement';
    return axios.get(urlBackend, { params });
};

export const getCashDetailByProductAPI = (params?: any) => {
    const urlBackend = '/api/BookStorage/getCashDetailByProduct';
    return axios.get(urlBackend, { params });
};

export const getTransferDataAPI = (params?: any) => {
    const urlBackend = '/api/BookStorage/getTransferData';
    return axios.get(urlBackend, { params });
};

export const getTransferDataByNbrAPI = (nbr: string) => {
    const urlBackend = `/api/BookStorage/getTransferDataByNbr?nbr=${nbr}`;
    return axios.get(urlBackend);
};

export const getCourseMaterialCheckListAPI = (params?: any) => {
    const urlBackend = '/api/BookStorage/getCourseMaterialCheckList';
    return axios.get(urlBackend, { params });
};

export const getCourseMaterialDeliveryByStudentAPI = (params?: any) => {
    const urlBackend = '/api/BookStorage/getCourseMaterialDeliveryByStudent';
    return axios.get(urlBackend, { params });
};

export const updateBookStorageStatusAPI = (data: any) => {
    const urlBackend = '/api/BookStorage/updateStatus';
    return axios.post(urlBackend, data);
};

export const getClassMaterialStatusAPI = (params?: any) => {
    const urlBackend = '/api/BookStorage/getClassMaterialStatus';
    return axios.get(urlBackend, { params });
};

export const getClassMaterialStatusByProductAPI = (params?: any) => {
    const urlBackend = '/api/BookStorage/getClassMaterialStatusByProduct';
    return axios.get(urlBackend, { params });
};

export const exportMaterialDataInClassAPI = (params?: any) => {
    const urlBackend = '/api/BookStorage/ExportMaterialDataInClass';
    return axios.get(urlBackend, { params });
};

import axios from 'services/axios.customize';

// ─── CENTER DETAILS ──────────────────────────────────────────────────────

/**
 * Lấy thông tin chi tiết của một trung tâm
 */
export const getCenterDetails = (centerID: number) => 
{
    const urlBackend = `/api/CenterDetails?centerID=${centerID}`;
    return axios.get(urlBackend);
};

/**
 * Lấy danh sách tất cả các trung tâm
 */
export const getCentersList = () => 
{
    const urlBackend = '/api/CenterDetails/Centers';
    return axios.get(urlBackend);
};

/**
 * Lấy danh sách người dùng theo vai trò tại trung tâm
 */
export const getUserByRole = (locationID: number, groupID: number) => 
{
    const urlBackend = `/api/CenterDetails/UserByRole?locationID=${locationID}&groupID=${groupID}`;
    return axios.get(urlBackend);
};

/**
 * Lấy danh sách các chức năng (Functions)
 */
export const getCenterFunctions = () => 
{
    const urlBackend = '/api/CenterDetails/Functions';
    return axios.get(urlBackend);
};

/**
 * Lấy danh sách chức năng theo nhóm (Group Function)
 */
export const getGroupFunctions = (groupID: number) => 
{
    const urlBackend = `/api/CenterDetails/Functions/GroupFunction?groupID=${groupID}`;
    return axios.get(urlBackend);
};

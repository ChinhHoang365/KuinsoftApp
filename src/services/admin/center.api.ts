import axios from '../axios.customize';

// ─── CENTER DETAILS ──────────────────────────────────────────────────────

/**
 * Lấy thông tin chi tiết của một trung tâm
 */
export const getCenterDetails = (centerID: number) => 
    axios.get(`/api/CenterDetails?centerID=${centerID}`);

/**
 * Lấy danh sách tất cả các trung tâm
 */
export const getCentersList = () => 
    axios.get('/api/CenterDetails/Centers');

/**
 * Lấy danh sách người dùng theo vai trò tại trung tâm
 */
export const getUserByRole = (locationID: number, groupID: number) => 
    axios.get(`/api/CenterDetails/UserByRole?locationID=${locationID}&groupID=${groupID}`);

/**
 * Lấy danh sách các chức năng (Functions)
 */
export const getCenterFunctions = () => 
    axios.get('/api/CenterDetails/Functions');

/**
 * Lấy danh sách chức năng theo nhóm (Group Function)
 */
export const getGroupFunctions = (groupID: number) => 
    axios.get(`/api/CenterDetails/Functions/GroupFunction?groupID=${groupID}`);

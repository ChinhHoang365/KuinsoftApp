import axios from '../axios.customize';

// ─── CENTER DETAILS ───────────────────────────────────────────────────
export const getCentersAPI = () => axios.get('/api/CenterDetails/Centers');
export const getCenterDetailAPI = (centerID: number) => axios.get(`/api/CenterDetails?centerID=${centerID}`);
export const getUserByRoleAPI = (centerID: number, roleID: number) => axios.get(`/api/CenterDetails/UserByRole?centerID=${centerID}&roleID=${roleID}`);
export const getFunctionsAPI = () => axios.get('/api/CenterDetails/Functions');
export const getGroupFunctionAPI = (roleID: number) => axios.get(`/api/CenterDetails/Functions/GroupFunction?roleID=${roleID}`);

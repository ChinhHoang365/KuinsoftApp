import axios from 'services/axios.customize';

// ─── CENTER DETAILS ───────────────────────────────────────────────────
export const getCentersAPI = () => {
    const urlBackend = '/api/CenterDetails/Centers';
    return axios.get(urlBackend);
};
export const getCenterDetailAPI = (centerID: number) => {
    const urlBackend = `/api/CenterDetails?centerID=${centerID}`;
    return axios.get(urlBackend);
};
export const getUserByRoleAPI = (centerID: number, roleID: number) => {
    const urlBackend = `/api/CenterDetails/UserByRole?centerID=${centerID}&roleID=${roleID}`;
    return axios.get(urlBackend);
};
export const getFunctionsAPI = () => {
    const urlBackend = '/api/CenterDetails/Functions';
    return axios.get(urlBackend);
};
export const getGroupFunctionAPI = (roleID: number) => {
    const urlBackend = `/api/CenterDetails/Functions/GroupFunction?roleID=${roleID}`;
    return axios.get(urlBackend);
};

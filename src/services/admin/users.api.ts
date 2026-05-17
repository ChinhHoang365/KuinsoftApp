import axios from 'services/axios.customize';

// ─── USERS ────────────────────────────────────────────────────────────

/**
 * Tìm kiếm người dùng theo từ khóa
 */
export const userSearchAPI = (findKey?: string | null) => {
    const urlBackend = `/api/Users/UserSearch${findKey ? `?findKey=${findKey}` : ''}`;
    return axios.get(urlBackend);
};

/**
 * Lấy danh sách người dùng theo vị trí
 */
export const getUserListAPI = (locationIds?: string) => {
    const urlBackend = `/api/Users/UserList${locationIds ? `?locationIds=${locationIds}` : ''}`;
    return axios.get(urlBackend);
};

/**
 * Lấy tất cả người dùng đang hoạt động
 */
export const findAllActiveUsersAPI = () => {
    const urlBackend = '/api/Users/findAllActive';
    return axios.get(urlBackend);
};

/**
 * Lấy thông tin chi tiết của một người dùng
 */
export const getUserInfoAPI = (userID: number) => {
    const urlBackend = `/api/Users/UserInfo?userID=${userID}`;
    return axios.get(urlBackend);
};

/**
 * Thêm người dùng mới (bao gồm Detail, Role, Student/Teacher info)
 */
export const addUserAPI = (data: any) => {
    const urlBackend = '/api/Users/AddUser';
    return axios.post(urlBackend, data);
};

/**
 * Cập nhật thông tin người dùng
 */
export const editUserAPI = (data: any) => {
    const urlBackend = '/api/Users/EditUser';
    return axios.put(urlBackend, data);
};

/**
 * Vô hiệu hóa người dùng
 */
export const inactiveUserAPI = (userID: number, inactive: boolean) => {
    const urlBackend = `/api/Users/Inactive?userID=${userID}&inactive=${inactive}`;
    return axios.put(urlBackend);
};

/**
 * Đổi mật khẩu cá nhân
 */
export const changePasswordAPI = (oldPassword: string, newPassword: string) => {
    const urlBackend = `/api/Users/changePassword?oldPassword=${oldPassword}&newPassword=${newPassword}`;
    return axios.post(urlBackend);
};

/**
 * Quản trị viên đổi mật khẩu cho người dùng
 */
export const adminChangePasswordAPI = (userName: string, newPassword: string) => {
    const urlBackend = '/api/Users/Admin/changePassword';
    return axios.post(urlBackend, { userName, newPassword });
};

/**
 * Reset mật khẩu về mặc định
 */
export const resetPasswordAPI = (userName: string) => {
    const urlBackend = `/api/Users/ResetPassword?userName=${userName}`;
    return axios.put(urlBackend);
};

/**
 * Lấy danh sách các loại tài khoản
 */
export const getAccountTypesAPI = () => {
    const urlBackend = '/api/Users/AccountTypes';
    return axios.get(urlBackend);
};

/**
 * Lấy danh sách các nhóm người dùng
 */
export const getGroupListAPI = () => {
    const urlBackend = '/api/Users/Group/GroupList';
    return axios.get(urlBackend);
};

/**
 * Lấy danh sách người dùng theo vai trò
 */
export const getUserByRoleAPI = (locationID: number, groupID: number) => {
    const urlBackend = `/api/Users/Group/UserByRole?locationID=${locationID}&groupID=${groupID}`;
    return axios.get(urlBackend);
};

/**
 * Lấy thông tin Menu dựa trên quyền của người dùng
 */
export const getUserMenuAPI = (userID: number, locationID: number) => {
    const urlBackend = `/api/Users/UserMenu?userID=${userID}&locationID=${locationID}`;
    return axios.get(urlBackend);
};

/**
 * Đăng nhập
 */
export const loginAPI = (userName: string, password: string, locationID?: number) => {
    const urlBackend = '/api/Users/Login/Users';
    return axios.post(urlBackend, { userName, password, locationID });
};

/**
 * Cập nhật ảnh đại diện
 */
export const updateImageAPI = (formData: FormData) => {
    const urlBackend = '/api/Users/UpdateImage';
    return axios.put(urlBackend, formData, { headers: { 'content-type': 'multipart/form-data' } });
};

/**
 * Quản trị viên cập nhật ảnh đại diện cho người dùng
 */
export const adminUpdateImageAPI = (formData: FormData) => {
    const urlBackend = '/api/Users/Admin/UpdateImage';
    return axios.put(urlBackend, formData, { headers: { 'content-type': 'multipart/form-data' } });
};

/**
 * Lấy chi tiết Token hiện tại
 */
export const getTokenDetailAPI = () => {
    const urlBackend = '/api/Users/Token/TokenDetail';
    return axios.get(urlBackend);
};

/**
 * Đăng ký tài khoản mới
 */
export const registerAPI = (fullName: string, email: string, password: string, phone: string) => {
    const urlBackend = '/api/Users/Register';
    return axios.post(urlBackend, { fullName, email, password, phone });
};


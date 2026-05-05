import axios from '../axios.customize';

// ─── USERS ────────────────────────────────────────────────────────────

/**
 * Tìm kiếm người dùng theo từ khóa
 */
export const userSearchAPI = (findKey?: string | null) =>
    axios.get(`/api/Users/UserSearch${findKey ? `?findKey=${findKey}` : ''}`);

/**
 * Lấy danh sách người dùng theo vị trí
 */
export const getUserListAPI = (locationIds?: string) =>
    axios.get(`/api/Users/UserList${locationIds ? `?locationIds=${locationIds}` : ''}`);

/**
 * Lấy tất cả người dùng đang hoạt động
 */
export const findAllActiveUsersAPI = () => 
    axios.get('/api/Users/findAllActive');

/**
 * Lấy thông tin chi tiết của một người dùng
 */
export const getUserInfoAPI = (userID: number) =>
    axios.get(`/api/Users/UserInfo?userID=${userID}`);

/**
 * Thêm người dùng mới (bao gồm Detail, Role, Student/Teacher info)
 */
export const addUserAPI = (data: any) => axios.post('/api/Users/AddUser', data);

/**
 * Cập nhật thông tin người dùng
 */
export const editUserAPI = (data: any) => axios.put('/api/Users/EditUser', data);

/**
 * Vô hiệu hóa người dùng
 */
export const inactiveUserAPI = (userID: number, inactive: boolean) =>
    axios.put(`/api/Users/Inactive?userID=${userID}&inactive=${inactive}`);

/**
 * Đổi mật khẩu cá nhân
 */
export const changePasswordAPI = (oldPassword: string, newPassword: string) =>
    axios.post(`/api/Users/changePassword?oldPassword=${oldPassword}&newPassword=${newPassword}`);

/**
 * Quản trị viên đổi mật khẩu cho người dùng
 */
export const adminChangePasswordAPI = (userName: string, newPassword: string) =>
    axios.post('/api/Users/Admin/changePassword', { userName, newPassword });

/**
 * Reset mật khẩu về mặc định
 */
export const resetPasswordAPI = (userName: string) =>
    axios.put(`/api/Users/ResetPassword?userName=${userName}`);

/**
 * Lấy danh sách các loại tài khoản
 */
export const getAccountTypesAPI = () => axios.get('/api/Users/AccountTypes');

/**
 * Lấy danh sách các nhóm người dùng
 */
export const getGroupListAPI = () => axios.get('/api/Users/Group/GroupList');

/**
 * Lấy danh sách người dùng theo vai trò
 */
export const getUserByRoleAPI = (locationID: number, groupID: number) =>
    axios.get(`/api/Users/Group/UserByRole?locationID=${locationID}&groupID=${groupID}`);

/**
 * Lấy thông tin Menu dựa trên quyền của người dùng
 */
export const getUserMenuAPI = (userID: number, locationID: number) =>
    axios.get(`/api/Users/UserMenu?userID=${userID}&locationID=${locationID}`);

/**
 * Đăng nhập
 */
export const loginAPI = (userName: string, password: string, locationID?: number) =>
    axios.post('/api/Users/Login/Users', { userName, password, locationID });

/**
 * Cập nhật ảnh đại diện
 */
export const updateImageAPI = (formData: FormData) =>
    axios.put('/api/Users/UpdateImage', formData, { headers: { 'content-type': 'multipart/form-data' } });

/**
 * Quản trị viên cập nhật ảnh đại diện cho người dùng
 */
export const adminUpdateImageAPI = (formData: FormData) =>
    axios.put('/api/Users/Admin/UpdateImage', formData, { headers: { 'content-type': 'multipart/form-data' } });

/**
 * Lấy chi tiết Token hiện tại
 */
export const getTokenDetailAPI = () => axios.get('/api/Users/Token/TokenDetail');

/**
 * Đăng ký tài khoản mới
 */
export const registerAPI = (fullName: string, email: string, password: string, phone: string) =>
    axios.post('/api/Users/Register', { fullName, email, password, phone });


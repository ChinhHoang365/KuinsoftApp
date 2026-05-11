import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    // QUAN TRỌNG: Đổi thành false để tránh lỗi CORS khi Server dùng Access-Control-Allow-Origin: *
    withCredentials: false, 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000, // Thêm timeout 10s để tránh treo request
});

// Request Interceptor
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        
        // Log gọn gàng hơn để debug
        if (import.meta.env.DEV) {
            console.log(`🚀 [API Request]: ${config.method?.toUpperCase()} ${config.url}`);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
instance.interceptors.response.use(
    (response) => {
        // Axios trả về object response, chúng ta bóc tách lấy data bên trong
        const data = response.data;

        // Xử lý logic lỗi riêng của Backend (nếu có quy định code !== 0 là lỗi)
        if (data && data.code !== undefined && data.code !== 0 && data.code !== 200) {
            return Promise.reject(data);
        }

        return data;
    },
    (error) => {
        // Xử lý lỗi HTTP (401, 403, 404, 500...)
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            console.error(`❌ [API Error]: ${status}`, data);

            // Tự động xử lý khi Token hết hạn
            if (status === 401) {
                localStorage.removeItem("token");
                // window.location.href = "/login"; // Tùy chọn redirect
            }

            return Promise.reject(data || { message: "Lỗi hệ thống" });
        } 
        
        // Lỗi không kết nối được server (Network Error / CORS)
        if (error.request) {
            console.error('❌ [No Response]:', error.request);
            return Promise.reject({
                message: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng hoặc cấu hình CORS.',
                code: -1
            });
        }

        return Promise.reject(error);
    }
);

export default instance;
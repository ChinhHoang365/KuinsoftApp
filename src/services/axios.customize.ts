import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        'content-type': 'application/json',
    },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log('Headers:', config.headers);

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Return the data directly for easier usage in components
    if (response && response.data) {
        // Check if response contains error (API returns code !== 0 for errors)
        if (response.data.code !== 0 && response.data.code !== undefined) {
            return Promise.reject(response.data);
        }
        return response.data;
    }
    return response;
}, function (error) {
    // Handle different error types
    if (error.response) {
        // Server responded with error status code
        console.error('API Error Response:', {
            status: error.response.status,
            statusText: error.response.statusText,
            data: JSON.stringify(error.response.data, null, 2),
            url: error.config?.url,
            method: error.config?.method
        });
        return Promise.reject(error.response.data || error);
    } else if (error.request) {
        // Request was made but no response received
        console.error('No response from server:', error.request);
        return Promise.reject({
            message: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.',
            code: -1
        });
    } else {
        // Error in request setup
        console.error('Request error:', error.message);
        return Promise.reject(error);
    }
});

export default instance;
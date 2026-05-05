import axios from '../axios.customize';

/**
 * Upload images to server and get URLs
 * @param files Array of file objects or base64 strings as per API spec
 */
export const uploadImageAPI = (objFile: string[]) => {
    return axios.post('/api/UploadFile/UrlImage', { objFile });
};

/**
 * Helper to convert File to Base64 if required by the string array spec
 */
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result as string;
            // Remove data:image/png;base64, prefix if necessary
            resolve(base64String.split(',')[1] || base64String);
        };
        reader.onerror = error => reject(error);
    });
};

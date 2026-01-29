const API_BASE_URL = 'https://workifybackend-production.up.railway.app/api';

// Umumiy fetch funksiyasi
const fetchAPI = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`API xatosi: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('API so\'rovi xatosi:', error);
        return {
            success: false,
            error: error.message,
            data: [] // Xato bo'lsa ham array qaytarish
        };
    }
};

export { fetchAPI };







import axios from 'axios';

const API = axios.create({
    baseURL: 'https://workifybackend-production.up.railway.app/api'
});

export const sendResetCode = async (email) => {
    try {
        const response = await API.post('/Company/send-reset-code', { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error("Xatolik yuz berdi");
    }
};

export const checkResetCode = async (email, code) => {
    try {
        const response = await API.post('/Company/check-reset-code', { email, code });
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error("Kod noto'g'ri");
    }
};

// 4-sahifa uchun: Parolni tasdiqlash va yangilash
export const confirmResetPassword = async (email, code, newPassword) => {
    try {
        // Swagger: /Company/confirm-reset-password
        const response = await API.post('/Company/confirm-reset-password', {
            email,
            code,
            newPassword
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error("Parolni yangilashda xatolik");
    }
};
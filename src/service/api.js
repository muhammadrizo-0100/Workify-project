const API_BASE_URL = 'https://workifybackend-production.up.railway.app/api-docs';

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
            data: []
        };
    }
};

export { fetchAPI };
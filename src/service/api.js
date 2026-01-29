// service/api.js
const API_BASE_URL = 'https://workifybackend-production.up.railway.app/api';

// Asosiy fetch funksiyasi
const fetchAPI = async (endpoint, options = {}) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers,
        };

        const config = {
            headers,
            ...options,
        };

        // Agar body bo'lsa, JSON.stringify qilamiz
        if (options.body && typeof options.body !== 'string') {
            config.body = JSON.stringify(options.body);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP Error ${response.status}: ${errorText}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return { success: true, data };
        }

        return { success: true, data: null };
    } catch (error) {
        console.error('API xatosi:', error);
        return {
            success: false,
            error: error.message,
            data: null
        };
    }
};

// Kompaniya API funksiyalari
const companyAPI = {
    // GET /api/company - barcha kompaniyalarni olish (yoki user kompaniyasini)
    getCompany: () => fetchAPI('/company'),

    // GET /api/company/{id} - ma'lum bir kompaniyani olish
    getCompanyById: (id) => fetchAPI(`/company/${id}`),

    // PUT /api/company/{id} - kompaniyani yangilash
    updateCompany: (id, data) => fetchAPI(`/company/${id}`, {
        method: 'PUT',
        body: data
    }),

    // POST /api/company - yangi kompaniya yaratish
    createCompany: (data) => fetchAPI('/company', {
        method: 'POST',
        body: data
    })
};

export { fetchAPI, companyAPI };
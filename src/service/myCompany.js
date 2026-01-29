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

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...options,
      body: options.body && JSON.stringify(options.body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Xato: ${response.status} - ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json')
      ? await response.json()
      : null;

    return { success: true, data };
  } catch (error) {
    console.error('API xatosi:', error);
    return { 
      success: false, 
      error: error.message, 
      data: null 
    };
  }
};

// Kompaniya API
const companyAPI = {
  getCompany: () => fetchAPI('/my-company'),
  updateCompany: (data) => fetchAPI('/my-company', {
    method: 'PUT',
    body: data
  }),

  getCompanyById: (id) => fetchAPI(`/companies/${id}`),
  updateCompanyById: (id, data) => fetchAPI(`/companies/${id}`, {
    method: 'PUT',
    body: data
  })
};

export { fetchAPI, companyAPI };
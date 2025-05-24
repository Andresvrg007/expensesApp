// Configuración de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
    LOGIN: `${API_URL}/api/login`,
    REGISTER: `${API_URL}/api/register`,
    PASSWORD: `${API_URL}/api/password`
    // Agrega aquí más endpoints según necesites
};

export default API_ENDPOINTS; 
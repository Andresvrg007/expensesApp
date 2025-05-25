// Configuración de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
    // Authentication endpoints
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    LOGOUT: `${API_BASE_URL}/logout`,
    VERIFY: `${API_BASE_URL}/verify`,
    PASSWORD: `${API_BASE_URL}/password`,
    
    // Transaction endpoints
    TRANSACTION: `${API_BASE_URL}/transaction`,
    TRANSACTIONS: `${API_BASE_URL}/transaction`,
    TRANSACTIONS_SUMMARY: `${API_BASE_URL}/transactions-summary`,
    
    // Reset endpoints
    RESET_MONTHLY: `${API_BASE_URL}/reset-monthly`,
    
    // User endpoints
    USER_PROFILE: `${API_BASE_URL}/user/profile`,
    
    // Base URL for direct fetch calls
    BASE_URL: API_URL
};

export default API_ENDPOINTS;
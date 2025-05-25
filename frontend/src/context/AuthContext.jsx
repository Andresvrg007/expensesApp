import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();    const verifyAuth = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.VERIFY, {
                credentials: 'include'
            });
            
            // Verificar si la respuesta es JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.error('Response is not JSON:', response.status, response.statusText);
                throw new Error('Server returned non-JSON response');
            }
            
            const data = await response.json();
            
            if (data.isAuthenticated) {
                setIsAuthenticated(true);
                setUser(data.user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error('Error verificando autenticación:', error);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyAuth();
    }, []);

    const logout = async () => {
        try {
            // Llamar al backend para limpiar la cookie
            await fetch(API_ENDPOINTS.LOGOUT, {
                method: 'POST',
                credentials: 'include'
            });
            
            // Limpiar el estado local
            setIsAuthenticated(false);
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Error en logout:', error);
            // Aún así, limpiar el estado local y redirigir
            setIsAuthenticated(false);
            setUser(null);
            navigate('/');
        }
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            user, 
            loading, 
            verifyAuth,
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}; 
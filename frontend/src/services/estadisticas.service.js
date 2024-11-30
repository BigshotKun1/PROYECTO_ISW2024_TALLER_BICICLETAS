import axios from './root.service.js';

const LOCAL_API_URL = 'http://localhost:3000/api';
const PROD_API_URL = 'http://146.83.198.35:1335/api';

const API_URL = window.location.hostname === 'localhost' ? LOCAL_API_URL : PROD_API_URL;

export const obtenerEstadisticas = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await axios.get(`${API_URL}/estadisticas`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
        throw error;
    }
};
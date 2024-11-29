import axios from 'axios';

export const obtenerEstadisticas = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await axios.get('http://localhost:3000/api/estadisticas', {
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
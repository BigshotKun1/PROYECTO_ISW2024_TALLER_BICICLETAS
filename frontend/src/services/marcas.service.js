import axios from './root.service.js';

export async function getMarcas() {
    try {
        const { data } = await axios.get('/marca/all');
        return data.data;  
    } catch (error) {
        console.error("Error al obtener las marcas:", error);
        return error.response?.data || { error: 'Error al obtener las marcas' };
    }
}


export async function getMarcaById(id) {
    try {
        const { data } = await axios.get(`/marca/${id}`);  
        return data.data;  
    } catch (error) {
        console.error("Error al obtener la marca:", error);
        return error.response?.data || { error: 'No se pudo obtener la marca' };
    }
}

export async function createMarca(marcaData) {
    try {
        const { data } = await axios.post('/marca', marcaData);  
        return data; 
    } catch (error) {
        console.error("Error al crear la marca:", error);
        return error.response?.data || { error: 'No se pudo crear la marca' };
    }
}

export async function updateMarca(id, updateData) {
    try {
        const { data } = await axios.put(`/marca/${id}`, updateData); 
        return data; 
    } catch (error) {
        console.error("Error al actualizar la marca:", error);
        return error.response?.data || { error: 'No se pudo actualizar la marca' };
    }
}

export async function deleteMarca(id) {
    try {
        const { data } = await axios.delete(`/marca/${id}`);  
        return data; 
    } catch (error) {
        console.error("Error al eliminar la marca:", error);
        return error.response?.data || { error: 'No se pudo eliminar la marca' };
    }
}

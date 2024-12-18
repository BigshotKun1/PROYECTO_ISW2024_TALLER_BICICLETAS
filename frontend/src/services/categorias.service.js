import axios from './root.service.js';

export async function getCategorias() {
    try {
        const { data } = await axios.get('/categoria/all');  // Ruta relativa para obtener todas las categorías
        return data.data;  // Devuelvo solo los datos de las categorías
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        return error.response?.data || { error: 'Error al obtener las categorías' };
    }
}

export async function getCategoriaById(id) {
    try {
        const { data } = await axios.get(`/categoria/${id}`);  
        return data.data;  
    } catch (error) {
        console.error("Error al obtener la categoría:", error);
        return error.response?.data || { error: 'No se pudo obtener la categoría' };
    }
}

export async function createCategoria(categoriaData) {
    try {
        const { data } = await axios.post('/categoria', categoriaData);  // Ruta relativa para crear una nueva categoría
        return data;  // Devuelvo los datos de la categoría creada
    } catch (error) {
        console.error("Error al crear la categoría:", error);
        return error.response?.data || { error: 'No se pudo crear la categoría' };
    }
}

export async function updateCategoria(id, updateData) {
    try {
        const { data } = await axios.put(`/categoria/${id}`, updateData);  // Ruta relativa para actualizar la categoría
        return data;  // Devuelvo los datos de la categoría actualizada
    } catch (error) {
        console.error("Error al actualizar la categoría:", error);
        return error.response?.data || { error: 'No se pudo actualizar la categoría' };
    }
}

export async function deleteCategoria(id) {
    try {
        const { data } = await axios.delete(`/categoria/${id}`);  // Ruta relativa para eliminar la categoría
        return data;  // Devuelvo los datos de la categoría eliminada
    } catch (error) {
        console.error("Error al eliminar la categoría:", error);
        return error.response?.data || { error: 'No se pudo eliminar la categoría' };
    }
}

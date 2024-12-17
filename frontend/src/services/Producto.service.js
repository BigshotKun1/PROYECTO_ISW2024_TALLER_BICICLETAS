import axios from './root.service.js';
import { formatProductosData } from '@helpers/formatDataP.js'; // Cambia al formato específico de productos.

export async function getProductos() {
    try {
        const { data } = await axios.get('/productos/'); // Ajusta la ruta a la del endpoint de productos.
        const formattedData = data.data.map(formatProductosData); // Cambia el formato al de productos.
        return formattedData;
    } catch (error) {
        return error.response?.data || { error: 'Error al obtener los productos' };
    }
}

export async function updateProductos(data, id) {
    try {
        const response = await axios.put(`/productos/${id}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response?.data || { error: 'Error al actualizar el producto' };
    }
}

export async function deleteProductos(id) {
    try {
        const response = await axios.delete(`/productos/${id}`); // Cambia el query param por path param.
        return response.data;
    } catch (error) {
        return error.response?.data || { error: 'Error al eliminar el producto' };
    }
}

export const createProducto = async (producto) => {
    try {
        const response = await axios.post('/productos', producto);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al crear producto');
    }
};
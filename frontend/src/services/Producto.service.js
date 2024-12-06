import axios from './root.service.js';
import { formatProductosData } from '@helpers/formatDataP.js'; // Cambia al formato específico de productos.

export async function getProductos() {
    try {
        const { data } = await axios.get('/productos/all'); // Ajusta la ruta a la del endpoint de productos.
        const formattedData = data.data.map(formatProductosData); // Cambia el formato al de productos.
        return formattedData;
    } catch (error) {
        return error.response?.data || { error: 'Error al obtener los productos' };
    }
}

export async function updateProductos(data, id) {
    try {
        const response = await axios.patch(`/productos/?id=${id}`, data); // Cambia `rut` por `id` o el identificador del producto.
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response?.data || { error: 'Error al actualizar el producto' };
    }
}

export async function deleteProductos(id) {
    try {
        const response = await axios.delete(`/productos/?id=${id}`); // Cambia `rut` por `id`.
        return response.data;
    } catch (error) {
        return error.response?.data || { error: 'Error al eliminar el producto' };
    }
}

export const createProducto = async (producto) => {
    try {
        const response = await axios.post('/api/productos', producto);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al crear producto');
    }
};
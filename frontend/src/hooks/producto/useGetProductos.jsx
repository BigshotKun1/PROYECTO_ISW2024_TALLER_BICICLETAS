import { useState, useEffect } from 'react';
import { getProductos } from '@services/Producto.service.js'; // Cambia el servicio a productos.

const useGetProductos = () => {
    const [productos, setProductos] = useState([]);

    const fetchProductos = async () => {
        try {
            const response = await getProductos();
            const formattedData = response.map(productos => ({
                id: productos.id, 
                nombre: productos.nombre,
                precio: productos.precio,
                cantidad: productos.cantidad,
                idM: productos.idM,
                idC: productos.idC,
                descuento: productos.descuento,
                idE: productos.idE,
                total: productos.total,
                createdAt: productos.createdAt,
            }));
            setProductos(formattedData);
        } catch (error) {
            console.error("Error al obtener productos: ", error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return { productos, fetchProductos, setProductos };
};

export default useGetProductos;

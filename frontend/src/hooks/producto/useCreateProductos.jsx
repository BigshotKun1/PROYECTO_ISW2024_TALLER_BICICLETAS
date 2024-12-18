import { useState } from 'react';
import { createProducto } from '@services/Producto.service.js'; // Cambia el servicio a productos.
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostCreate } from '@helpers/formatDataP.js'; // Suponiendo que hay un helper para crear datos.

const useCreateProductos = (setProductos) => {
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

    // Abre el popup de creación
    const handleClickCreate = () => {
        console.log('click create');
        setIsCreatePopupOpen(true); // Solo abrimos el popup sin depender de los datos previos
    };

    // Maneja la creación de un producto
    const handleCreate = async (newProductoData) => {
        if (newProductoData) {
            try {
                console.log('Creando producto:', newProductoData);
                const createdProducto = await createProducto(newProductoData); 
                
                showSuccessAlert('¡Producto Creado!', 'El producto ha sido creado correctamente.');
                
                
                setIsCreatePopupOpen(false);
                
                // Formateamos el producto creado (si es necesario)
                const formattedProducto = formatPostCreate(createdProducto);
                console.log('Producto creado sin formatear:', createdProducto);
                console.log('Producto formateado:', formattedProducto);
                console.log('Producto: ', createdProducto.data);
                // Actualizamos la lista de productos con el nuevo producto creado
                setProductos(prevProductos => [...prevProductos, createdProducto.data]);
            } catch (error) {
                console.error('Error al crear el producto:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al crear el producto.');
            }
        }
    };

    return {
        handleClickCreate,
        handleCreate,
        isCreatePopupOpen,
        setIsCreatePopupOpen,
    };
};

export default useCreateProductos;


import { useState } from 'react';
import { updateProductos } from '@services/producto.service.js'; // Cambia el servicio a productos.
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatDataP.js';

const useEditProductos = (setProductos) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataProductos, setDataProductos] = useState([]);
    
    const handleClickUpdate = () => {
        if (dataProductos.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedProductosData) => {
        if (updatedProductosData) {
            try {
                const updatedProductos = await updateProductos(updatedProductosData, dataProductos[0].id); // Usa 'id' como identificador.
                showSuccessAlert('¡Actualizado!', 'El producto ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                const formattedProductos = formatPostUpdate(updatedProductos);

                setProductos(prevProductos => prevProductos.map(productos => 
                    productos.id === formattedProductos.id ? formattedProductos : productos
                ));

                setDataProductos([]);
            } catch (error) {
                console.error('Error al actualizar el producto:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el producto.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataProductos,
        setDataProductos,
    };
};

export default useEditProductos;

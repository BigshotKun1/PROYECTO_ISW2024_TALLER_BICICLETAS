import { deleteProductos } from '@services/Producto.service.js'; // Cambia el servicio a productos.
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteProductos = (fetchProductos, setDataProducto) => {
    const handleDelete = async (dataProductos) => {
        if (dataProductos.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    const response = await deleteProductos(dataProductos[0].id); // Usa 'id' como identificador único.
                    if (response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!', 'El producto ha sido eliminado correctamente.');
                    await fetchProductos(); // Actualiza la lista de productos.
                    setDataProducto([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el producto.');
            }
        }
    };

    return {
        handleDelete,
    };
};

export default useDeleteProductos;
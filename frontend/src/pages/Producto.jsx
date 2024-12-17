import Table from '@components/Table';
import useProductos from '@hooks/producto/useGetProductos.jsx';
import Search from '../components/Search';
import Poprod from '../components/Poprod';
import PoCprod from '../components/PoCprod';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import CreateIcon from '../assets/createIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback, useState } from 'react';
import '@styles/users.css';
import useEditProductos from '@hooks/producto/useEditProductos';
import {deleteProductos} from '@services/Producto.service';
import useCreateProductos from '@hooks/producto/useCreateProductos';

const Producto = () => {
  const { productos, fetchProductos, setProductos } = useProductos();
  const [filterNombre, setFilterNombre] = useState('');

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataProductos,
    setDataProductos,
  } = useEditProductos(setProductos);

  const {
    handleClickCreate,
    handleCreate,
    isCreatePopupOpen,
    setIsCreatePopupOpen,
  } = useCreateProductos(setProductos);

  const handleDelete = useCallback(() => {
    if (dataProductos.length === 0) return;

    // Extrae los IDs de los productos seleccionados.
    const idsToDelete = dataProductos.map((producto) => producto.id);

    // Llama a la función `deleteProductos` con los IDs seleccionados.
    deleteProductos(idsToDelete)
      .then(() => {
        fetchProductos(); // Refresca la lista después de la eliminación.
      })
      .catch((error) => {
        console.error('Error al eliminar productos:', error);
      });
  }, [dataProductos, fetchProductos]);

  const handleNombreFilterChange = (e) => {
    setFilterNombre(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedProductos) => {
      setDataProductos(selectedProductos);
    },
    [setDataProductos]
  );



  const columns = [
    { title: 'Nombre', field: 'nombre', width: 320, responsive: 0 },
    { title: 'Precio', field: 'precio', width: 105, responsive: 2 },
    { title: 'Cantidad', field: 'cantidad', width: 103, responsive: 2 },
    { title: 'Marca', field: 'idM', width: 100, responsive: 2 },
    { title: 'Categoría', field: 'idC', width: 110, responsive: 2 },
    { title: 'Descuento', field: 'descuento', width: 115, responsive: 2 },
    { title: 'Total', field: 'total', width: 105, responsive: 2 },
    { title: 'Estado', field: 'idE', width: 105, responsive: 2 },
    { title: 'Creado', field: 'createdAt', width: 100, responsive: 2 },
  ];

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Productos</h1>
          <div className='filter-actions'>
            <Search
              value={filterNombre}
              onChange={handleNombreFilterChange}
              placeholder={'Filtrar por nombre'}
            />
            <button
              onClick={handleClickUpdate}
              disabled={dataProductos.length === 0}
            >
              {dataProductos.length === 0 ? (
                <img src={UpdateIconDisable} alt='edit-disabled' />
              ) : (
                <img src={UpdateIcon} alt='edit' />
              )}
            </button>
            <button
              className='Delete-product-button'
              disabled={dataProductos.length === 0}
              onClick={handleDelete}
            >
              {dataProductos.length === 0 ? (
                <img src={DeleteIconDisable} alt='delete-disabled' />
              ) : (
                <img src={DeleteIcon} alt='delete' />
              )}
            </button>
            <button
              className='Create_Prod'
              onClick={handleClickCreate}
            >
              <img src={CreateIcon} alt='create' />
            </button>
          </div>
        </div>
        <Table
          data={productos} 
          columns={columns}
          filter={filterNombre} 
          dataToFilter={'nombre'} 
          initialSortName={'nombre'} 
          onSelectionChange={handleSelectionChange}
        />
        <div>
          <button
              className='Create_Prod'
              onClick={handleClickCreate}
          >
              <img src={CreateIcon} alt='create' />
          </button>
          <button
              className='Create_Prod'
              onClick={handleClickCreate}
          >
              <img src={CreateIcon} alt='create' />
          </button>
        </div>
        
      </div>
      <Poprod
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        data={dataProductos}
        action={handleUpdate}
      />
      <PoCprod
        show={isCreatePopupOpen}
        setShow={setIsCreatePopupOpen}
        action={handleCreate}
      />

    </div>
  );
};

export default Producto;

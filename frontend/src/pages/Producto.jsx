import Table from '@components/Table';
import useProductos from '@hooks/producto/useGetProductos.jsx';
import Search from '../components/Search';
import Poprod from '../components/Poprod';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback, useState } from 'react';
import '@styles/users.css';
import useEditProductos from '@hooks/producto/useEditProductos';
import useDeleteProductos from '@hooks/producto/useDeleteProductos';

const Producto = () => {
  const { productos, fetchProductos, setProductos } = useProductos();
  const [filterNombre, setFilterNombre] = useState('');

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataProductos,
    setDataProductos
  } = useEditProductos(setProductos);

  const { handleDelete } = useDeleteProductos(fetchProductos, setDataProductos);

  const handleNombreFilterChange = (e) => {
    setFilterNombre(e.target.value);
  };

  const handleSelectionChange = useCallback((selectedProductos) => {
    setDataProductos(selectedProductos);
  }, [setDataProductos]);

  const columns = [
    { title: "Nombre", field: "nombre", width: 320, responsive: 0 },
    { title: "Precio", field: "precio", width: 105, responsive: 2 },
    { title: "Cantidad", field: "cantidad", width: 103, responsive: 2 },
    { title: "Marca", field: "idM", width: 100, responsive: 2 },
    { title: "Categoría", field: "idC", width: 110, responsive: 2 },
    { title: "Descuento", field: "descuento", width: 115, responsive: 2},
    { title: "Total", field: "total", width: 105, responsive: 2},
    { title: "Estado", field: "idE", width: 105, responsive: 2},
    { title: "Creado", field: "createdAt", width: 100, responsive: 2 }
  ];

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Productos</h1>
          <div className='filter-actions'>
            <Search value={filterNombre} onChange={handleNombreFilterChange} placeholder={'Filtrar por nombre'} />
            <button onClick={handleClickUpdate} disabled={dataProductos.length === 0}>
              {dataProductos.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button className='delete-product-button' disabled={dataProductos.length === 0} onClick={() => handleDelete(dataProductos)}>
              {dataProductos.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>
          </div>
        </div>
        <Table
          data={productos} // Cambia 'users' a 'products'.
          columns={columns}
          filter={filterNombre} // Cambia el filtro a 'nombre'.
          dataToFilter={'nombre'} // Cambia el campo de filtro.
          initialSortName={'nombre'} // Cambia el campo de ordenamiento inicial.
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <Poprod show={isPopupOpen} setShow={setIsPopupOpen} data={dataProductos} action={handleUpdate} />
    </div>
  );
};

export default Producto;
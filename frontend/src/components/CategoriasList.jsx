import { useEffect, useState } from 'react';
import { getCategorias } from '@services/categorias.service';
import setCategorias from '@hooks/categorias/useCategorias'; 
import '@styles/categorias.css';

const CategoriaList = ({ categorias }) => {  // Recibe las categorías desde el prop
  const [error, setError] = useState('');

  useEffect(() => {
    if (!categorias) {
      const fetchCategorias = async () => {
        try {
          const categoriasData = await getCategorias();
          setCategorias(categoriasData);
        } catch (error) {
          setError('Error al obtener las categorías', error);
        }
      };
      fetchCategorias();
    }
  }, [categorias]);

  return (
    <div className="categorias-list-container">
      {error && <p className="error">{error}</p>}
      <table className="categorias-table">
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.idC}>
              <td>{categoria.categorias}</td>
              <td>
                <button onClick={() => handleEdit(categoria.idC)}>Editar</button>
                <button onClick={() => handleDelete(categoria.idC)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const handleEdit = (id) => {
  console.log('Editando categoría con ID:', id);
};

const handleDelete = (id) => {
  console.log('Eliminando categoría con ID:', id);
};

export default CategoriaList;

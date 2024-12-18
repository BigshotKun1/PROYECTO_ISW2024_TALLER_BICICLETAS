import { useEffect, useState } from 'react';
import { getMarcas } from '@services/marcas.service';  
import setMarcas from '@hooks/categorias/useCategorias';
import '@styles/marcas.css';

const MarcasList = ({ marcas }) => {  // Recibe las marcas desde el prop
  const [error, setError] = useState('');

  useEffect(() => {
    if (!marcas) {
      const fetchMarcas = async () => {
        try {
          const marcasData = await getMarcas();
          setMarcas(marcasData);
        } catch (error) {
          setError('Error al obtener las marcas', error);
        }
      };
      fetchMarcas();
    }
  }, [marcas]);

  return (
    <div className="marcas-list-container">
      {error && <p className="error">{error}</p>}
      <table className="marcas-table">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Accions</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((marca) => (
            <tr key={marca.idM}>
              <td>{marca.marcas}</td>
              <td>
                <button onClick={() => handleEdit(marca.idM)}>Editar</button>
                <button onClick={() => handleDelete(marca.idM)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const handleEdit = (id) => {
  console.log('Editando marca con ID:', id);
};

const handleDelete = (id) => {
  console.log('Eliminando marca con ID:', id);
};

export default MarcasList;


import { useState, useEffect } from 'react';
import { getCategorias } from '@services/categorias.service'; 

const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await getCategorias();
        setCategorias(categoriasData);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar categorías', error);
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  return { categorias, loading, error };
};

export default useCategorias;

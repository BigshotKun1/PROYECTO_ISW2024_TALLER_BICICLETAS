import { useState, useEffect } from 'react';
import { getMarcas } from '@services/marcas.service'; 

const useMarcas = () => {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const marcasData = await getMarcas();
        setMarcas(marcasData);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar marcas', error);
        setLoading(false);
      }
    };

    fetchMarcas();
  }, []);

  return { marcas, loading, error };
};

export default useMarcas;
import { useState, useEffect } from 'react';
import { getBicicletasPorCliente } from '@services/bicicleta.service.js'; // Asegúrate de que la ruta sea correcta

export const useGetBicicletas = (rut) => {
  const [bicicletas, setBicicletas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBicicletas = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBicicletasPorCliente(rut); // Usamos el servicio para obtener bicicletas por rut
        setBicicletas(data);
      } catch (err) {
        setError('Error al obtener bicicletas');
        console.error('Error al obtener bicicletas:', err);
      } finally {
        setLoading(false);
      }
    };

    if (rut) {
      fetchBicicletas();
    }
  }, [rut]);

  return { bicicletas, loading, error };
};

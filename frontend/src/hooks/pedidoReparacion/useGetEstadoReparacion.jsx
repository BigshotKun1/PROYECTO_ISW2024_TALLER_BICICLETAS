import { useState, useEffect } from 'react';
import { getEstadosReparacion } from '@services/estadoReparacion.service.js'; // Importamos el servicio

export const useEstadosReparacion = () => {
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const data = await getEstadosReparacion(); // Usamos el servicio para obtener los estados
        setEstados(data);
      } catch (error) {
        console.error('Error al obtener los estados de reparación:', error);
        setError('No se pudieron cargar los estados de reparación');
      } finally {
        setLoading(false);
      }
    };

    fetchEstados();
  }, []);

  return { estados, loading, error };
};

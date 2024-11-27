 import { useState, useEffect } from 'react';
import { getClientes } from '@services/cliente.service.js';  // Asegúrate de que este servicio esté bien definido
import '@styles/cliente-table.css';

export const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await getClientes(); // Llama al servicio que obtiene los clientes
        setClientes(response); // Asegúrate de que la respuesta sea un array de clientes
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los clientes.");
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  return { clientes, loading, error };
};

export default useClientes;
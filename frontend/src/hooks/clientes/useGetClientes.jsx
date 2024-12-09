 import { useState, useEffect } from 'react';
import { getClientes } from '@services/cliente.service.js'; 
import '@styles/cliente-table.css';

export const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await getClientes(); 
        setClientes(response); 
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
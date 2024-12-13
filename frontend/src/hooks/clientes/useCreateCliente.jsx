import { useState } from 'react';

const useCreateCliente = (setClientes) => {
  const [loading, setLoading] = useState(false);

  const createCliente = async (newCliente) => {
    setLoading(true);
    try {
      const response = await fetch('/cliente/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCliente)
      });

      if (!response.ok) {
        throw new Error('Error al crear cliente');
      }

      const data = await response.json();
      setClientes((prevClientes) => [...prevClientes, data]); // Agregar cliente a la lista
    } catch (error) {
      console.error('Error al crear cliente', error);
    } finally {
      setLoading(false);
    }
  };

  return { createCliente, loading };
};

export default useCreateCliente;

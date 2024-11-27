// hooks/clientes/useUpdateCliente.js
import { useState } from 'react';
import { updateCliente } from '@services/cliente.service.js'; // Asegúrate de que la función updateCliente esté definida en tu service

const useUpdateCliente = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (clienteData) => {
    setLoading(true);
    setError(null);
    try {
      await updateCliente(clienteData); // Llamar al servicio para actualizar el cliente
      setLoading(false);
    } catch (err) {
      setError('Error al actualizar el cliente');
      setLoading(false);
      console.error('Error al actualizar el cliente: ', err);
    }
  };

  return { update, loading, error };
};

export default useUpdateCliente;

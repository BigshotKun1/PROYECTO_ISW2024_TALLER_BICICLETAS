import { useState, useEffect } from "react";
import { fetchPedidosReparacion } from "@services/PedidoReparacion.service";

export const usePedidosReparacion = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      try {
        const response = await fetchPedidosReparacion();
        console.log("Respuesta de API:", response);
        setPedidos(response.data || []); // Ajusta según el formato de respuesta
      } catch (err) {
        setError("Error al cargar los pedidos de reparación.");
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  return { pedidos, loading, error };
};




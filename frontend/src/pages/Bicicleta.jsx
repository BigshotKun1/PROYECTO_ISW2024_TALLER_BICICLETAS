import React, { useState, useEffect } from 'react';
import { getBicicletasPorCliente } from '@services/bicicleta.service.js'; // Asegúrate de importar la función

const Bicicleta = () => {
  const [bicicletas, setBicicletas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBicicletas = async () => {
      try {
        // Probar la función getBicicletasPorCliente con un RUT de prueba
        const rut = '21.005.789-7'; // Reemplaza con un RUT válido de prueba
        const bicicletasResponse = await getBicicletasPorCliente(rut);

        console.log("Bicicletas recibidas:", bicicletasResponse.data);
        setBicicletas(bicicletasResponse.data);
      } catch (err) {
        console.error("Error al obtener bicicletas:", err);
        setError("Hubo un error al cargar las bicicletas.");
      } finally {
        setLoading(false);
      }
    };

    fetchBicicletas();
  }, []); // Ejecutar solo una vez cuando se monta el componente

  return (
    <div>
      {loading && <p>Cargando bicicletas...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <h2>Bicicletas:</h2>
      <ul>
        {bicicletas.length > 0 ? (
          bicicletas.map((bicicleta) => (
            <li key={bicicleta.id_Bicicleta}>
              {bicicleta.marca} {bicicleta.modelo} ({bicicleta.color})
            </li>
          ))
        ) : (
          <p>No hay bicicletas disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default Bicicleta;

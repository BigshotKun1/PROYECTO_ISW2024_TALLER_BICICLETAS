
/*
const ClientesList = () => {
  const { clientes, loading, error } = useClientes();

  if (loading) {
    return <p>Cargando clientes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.rut}>
              <td>{cliente.nombreCompleto}</td>
              <td>{cliente.rut}</td>
              <td>{cliente.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesList;
*/
import React, { useState, useEffect } from "react";
import axios from "axios";

const ClientesConBicicletas = () => {
    const [clientes, setClientes] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
      const fetchBicicletas = async () => {
        try {
          // Realiza la solicitud GET
          const response = await axios.get("/bicicleta/all");
          
          // Muestra la respuesta completa en consola para depurar
          console.log('Respuesta del backend:', response);
      
          // Verifica si la respuesta tiene la propiedad 'data' y si es un array
          if (response.data || !Array.isArray(response.data.data)) {
            throw new Error("El formato de la respuesta es incorrecto.");
          }
      
          // Si la respuesta es correcta, continua procesando los datos
          const bicicletas = response.data.data;
      
          // Agrupa bicicletas por cliente
          const clientesConBicicletas = bicicletas.reduce((acc, bicicleta) => {
            const { cliente } = bicicleta;
            if (!acc[cliente.rut]) {
              acc[cliente.rut] = {
                ...cliente,
                bicicletas: [],
              };
            }
            acc[cliente.rut].bicicletas.push(bicicleta);
            return acc;
          }, {});
      
          // Establece los datos de los clientes y sus bicicletas en el estado
          setClientes(Object.values(clientesConBicicletas));
      
        } catch (err) {
          console.error("Error al obtener bicicletas:", err);
          setError("No se pudieron cargar los clientes y sus bicicletas.");
        }
      };
      
      

        fetchBicicletas();
    }, []);

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="container">
            <h1>Clientes y sus Bicicletas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>RUT</th>
                        <th>Nombre Completo</th>
                        <th>Teléfono</th>
                        <th>Bicicletas</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(clientes).map((cliente) => (
                        <tr key={cliente.rut}>
                            <td>{cliente.rut}</td>
                            <td>{cliente.nombreCompleto}</td>
                            <td>{cliente.telefono}</td>
                            <td>
                                {cliente.bicicletas.length > 0 ? (
                                    <ul>
                                        {cliente.bicicletas.map((bici) => (
                                            <li key={bici.id_Bicicleta}>
                                                {bici.marca} - {bici.modelo} ({bici.color})
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    "Sin bicicletas registradas"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientesConBicicletas;


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



/*
import React, { useState, useEffect } from "react";
import { obtenerClientesConBicicletas } from "@services/cliente.service.js"; // Asegúrate de importar el servicio

const ClientesConBicicletas = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientesConBicicletas = async () => {
      try {
        const data = await obtenerClientesConBicicletas(); // Llama al servicio

        // Si no hay datos, muestra un mensaje de error
        if (!data || data.length === 0) {
          throw new Error('No se encontraron clientes con bicicletas.');
        }

        setClientes(data); // Establece los clientes en el estado
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener los clientes con bicicletas:', err);
        setError('No se pudieron cargar los clientes y sus bicicletas.');
        setLoading(false);
      }
    };

    fetchClientesConBicicletas(); // Ejecuta la función para obtener los datos
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
          {clientes.map((cliente) => (
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

*/

/*
import React, { useState, useEffect, useCallback } from 'react';
import Table from '@components/Table';
import Search from '../components/Search';
import Popup from '../components/Popup';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import '@styles/users.css';
import { obtenerClientesConBicicletas } from '@services/cliente.service'; // Importa el servicio

const ClientesConBicicletas = () => {
  const [clientes, setClientes] = useState([]);
  const [filterRut, setFilterRut] = useState('');
  const [selectedClientes, setSelectedClientes] = useState([]);

  // Obtener los clientes y bicicletas del backend
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await obtenerClientesConBicicletas(); // Obtén los clientes y bicicletas
        console.log('Clientes con bicicletas:', data);
        setClientes(data);

      } catch (error) {
        console.error('Error al obtener los clientes con bicicletas:', error);
      }
    };

    fetchClientes();
  }, []);

  // Filtrar por RUT
  const handleRutFilterChange = (e) => {
    setFilterRut(e.target.value);
  };

  // Manejar selección de clientes
  const handleSelectionChange = useCallback((selectedClientes) => {
    setSelectedClientes(selectedClientes);
  }, []);

  const columns = [
    { title: "Nombre Completo", field: "nombreCompleto", width: 250 },
    { title: "Rut", field: "rut", width: 150 },
    { title: "Teléfono", field: "telefono", width: 150 },
    {
      title: "Bicicletas",
      field: "bicicletas",
      width: 300,
      render: (row) => {
        const bicicletas = row.bicicletas;
        if (bicicletas && bicicletas.length > 0) {
          return (
            <ul>
              {bicicletas.map((bicicleta) => (
                <li key={bicicleta.id_Bicicleta}>
                  <strong>Marca:</strong> {bicicleta.marca} <br />
                  <strong>Modelo:</strong> {bicicleta.modelo} <br />
                  <strong>Color:</strong> {bicicleta.color} <br />
                </li>
              ))}
            </ul>
          );
        }
        return 'Sin bicicletas registradas';
      }
    }
  ];
  
  

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Clientes y sus Bicicletas</h1>
          <div className='filter-actions'>
            <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'Filtrar por rut'} />
            <button onClick={() => alert('Actualizar')} disabled={selectedClientes.length === 0}>
              {selectedClientes.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button className='delete-user-button' disabled={selectedClientes.length === 0} onClick={() => alert('Eliminar')}>
              {selectedClientes.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>
          </div>
        </div>
        <Table
          data={clientes}
          columns={columns}
          filter={filterRut}
          dataToFilter={'rut'}
          initialSortName={'nombreCompleto'}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <Popup show={false} setShow={() => {}} data={selectedClientes} action={() => {}} />
    </div>
  );
};

export default ClientesConBicicletas;


*/



import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from '@components/Table';  // Tabla ya configurada
import Search from '../components/Search'; // Componente de búsqueda
import Popup from '../components/Popup'; // Componente de Popup
import DeleteIcon from '../assets/deleteIcon.svg';  // Icono de eliminar
import UpdateIcon from '../assets/updateIcon.svg';  // Icono de editar
import UpdateIconDisable from '../assets/updateIconDisabled.svg'; // Icono de editar deshabilitado
import DeleteIconDisable from '../assets/deleteIconDisabled.svg'; // Icono de eliminar deshabilitado
import { useCallback } from 'react';
import '@styles/users.css';  // Estilos personalizados
import { obtenerClientesConBicicletas } from '@services/cliente.service.js'; // Importar el servicio

const ClientesConBicicletas = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterRut, setFilterRut] = useState('');

  // Cargar los clientes y sus bicicletas
  useEffect(() => {
    const fetchClientesConBicicletas = async () => {
      try {
        const data = await obtenerClientesConBicicletas(); // Usar el servicio

        if (!data || !Array.isArray(data)) {
          throw new Error("El formato de la respuesta es incorrecto.");
        }

        // Consolida la información de los clientes con bicicletas
        const clientesConBicicletas = data.map(cliente => {
          const bicicletasInfo = cliente.bicicletas.map(bicicleta =>
            `${bicicleta.marca} - ${bicicleta.modelo} (${bicicleta.color})`
          ).join(", ");
          
          return {
            ...cliente,
            bicicletas: bicicletasInfo, // Concatenamos la información de bicicletas
          };
        });

        setClientes(clientesConBicicletas);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener clientes con bicicletas:', err);
        setError('No se pudieron cargar los clientes y sus bicicletas.');
        setLoading(false);
      }
    };

    fetchClientesConBicicletas();
  }, []);

  // Funciones de manejo de filtro, actualización y eliminación
  const handleRutFilterChange = (e) => setFilterRut(e.target.value);

  const handleSelectionChange = useCallback((selectedUsers) => {
    // Lógica para manejar selección de usuarios
  }, []);

  const handleUpdate = (selectedUser) => {
    // Lógica para actualizar usuario
  };

  const handleDelete = (selectedUser) => {
    // Lógica para eliminar usuario
  };

  // Columnas de la tabla
  const columns = [
    { title: "Rut", field: "rut", width: 150 },
    { title: "Nombre Completo", field: "nombreCompleto", width: 250 },
    { title: "Teléfono", field: "telefono", width: 150 },
    { title: "Bicicletas", field: "bicicletas", width: 400 },
  ];

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Clientes y sus Bicicletas</h1>
          <div className='filter-actions'>
            <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'Filtrar por rut'} />
            <button onClick={() => handleUpdate()} disabled={clientes.length === 0}>
              <img src={UpdateIcon} alt="edit" />
            </button>
            <button onClick={() => handleDelete()} disabled={clientes.length === 0}>
              <img src={DeleteIcon} alt="delete" />
            </button>
          </div>
        </div>

        <Table
          data={clientes} // Los datos ya consolidados
          columns={columns}
          filter={filterRut}
          dataToFilter={'rut'}
          initialSortName={'nombreCompleto'}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      <Popup show={false} setShow={() => {}} data={[]} action={handleUpdate} />
    </div>
  );
};

export default ClientesConBicicletas;

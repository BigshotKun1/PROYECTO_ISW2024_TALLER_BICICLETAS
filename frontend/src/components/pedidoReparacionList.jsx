import React from 'react';
import { usePedidosReparacion } from '@hooks/pedidoReparacion/useGetpedidoReparacion';
import '@styles/pedido-reparacion-table.css';
import '@styles/home-background.css';

const PedidosReparacionTable = () => {
  const { pedidos, loading, error } = usePedidosReparacion();

  // Manejo de estado de carga
  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  // Manejo de errores
  if (error) {
    return <div className="error">{error}</div>;
  }

  // Acceder a los datos de los pedidos (si la API devuelve una estructura 'data')
  const pedidosData = pedidos?.data || [];

  return (
    
    <div className="home-background">
      {/* Overlay para oscurecer el fondo */}
      <div className="overlay">
      
      {/* Contenedor de la tabla */}
      <div className="content">
        <table className="pedido-reparacion-table">
          <thead>
            <tr>
              <th>Bicicleta</th>
              <th>Motivo de Reparación</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Fecha de Creación</th>
              <th>Fecha de Actualización</th>
            </tr>
          </thead>
          <tbody>
            {/* Verifica si hay pedidos disponibles */}
            {pedidosData.length > 0 ? (
              pedidosData.map((pedido) => (
                <tr key={pedido.id_PedidoReparacion}>
                  <td>
                    {pedido.bicicleta?.marca || 'Desconocida'} {pedido.bicicleta?.modelo || 'No disponible'} ({pedido.bicicleta?.color || 'No disponible'})
                  </td>
                  <td>{pedido.motivoReparacion || 'No especificado'}</td>
                  <td>{pedido.descripcionReparacion || 'A espera de revisión del mecanico'}</td>
                  <td>
                    {pedido.estadoReparacion?.estados_r !== null && pedido.estadoReparacion?.estados_r !== undefined
                      ? pedido.estadoReparacion.estados_r
                      : 'Estado no disponible'}
                  </td>
                  <td>{pedido.createdAt ? new Date(pedido.createdAt).toLocaleDateString() : 'Fecha no disponible'}</td>
                  <td>{pedido.updatedAt ? new Date(pedido.updatedAt).toLocaleDateString() : 'Fecha no disponible'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No hay pedidos de reparación disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};


export default PedidosReparacionTable;


/*import React from 'react';
import { usePedidosReparacion } from '@hooks/pedidoReparacion/useGetpedidoReparacion';
import '@styles/pedido-reparacion-table.css';

const PedidosReparacionTable = () => {
  const { pedidos, loading, error } = usePedidosReparacion();

  // Manejo de estado de carga
  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  // Manejo de errores
  if (error) {
    return <div className="error">{error}</div>;
  }

  // Acceder a los datos de los pedidos (si la API devuelve una estructura 'data')
  const pedidosData = pedidos?.data || [];

  return (
    <table className="pedido-reparacion-table">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>RUT</th>
          <th>Teléfono</th>
          <th>Bicicleta</th>
          <th>Motivo de Reparación</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Fecha de Creación</th>
        </tr>
      </thead>
      <tbody>
        { Verifica si hay pedidos disponibles }
        {pedidosData.length > 0 ? (
          pedidosData.map((pedido) => (
            <tr key={pedido.id_PedidoReparacion}>
              <td>{pedido.cliente?.nombreCompleto || 'Desconocido'}</td>
              <td>{pedido.cliente?.rut || 'No disponible'}</td>
              <td>{pedido.cliente?.telefono || 'No disponible'}</td>
              <td>
                {pedido.bicicleta?.marca || 'Desconocida'} {pedido.bicicleta?.modelo || 'No disponible'} ({pedido.bicicleta?.color || 'No disponible'})
              </td>
              <td>{pedido.motivoReparacion || 'No especificado'}</td>
              <td>{pedido.descripcionReparacion || 'A espera de revisión del mecanico'}</td>
              <td>
                {pedido.estadoReparacion?.estados_r !== null && pedido.estadoReparacion?.estados_r !== undefined
                  ? pedido.estadoReparacion.estados_r
                  : 'Estado no disponible'}
              </td>
              <td>{pedido.createdAt ? new Date(pedido.createdAt).toLocaleDateString() : 'Fecha no disponible'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8">No hay pedidos de reparación disponibles.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PedidosReparacionTable;
*/
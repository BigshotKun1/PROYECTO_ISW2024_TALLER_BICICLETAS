/* eslint-disable no-unused-vars */
import axios from './root.service.js';
import { formatUserData } from '@helpers/formatData.js';


// Función para crear un nuevo pedido de reparación
export const createPedidoReparacion = async (newPedido) => {
  try {
    // Realizamos la solicitud POST para crear un nuevo pedido
    const response = await axios.post('/pedidoReparacion', newPedido);
    
    // Si la respuesta es exitosa, retornamos los datos
    return {
      status: "Success",
      data: response.data,
    };
  } catch (error) {
    // Si ocurre un error, capturamos y retornamos el mensaje de error
    console.error("Error al crear el pedido:", error.response ? error.response.data : error);
    return {
      status: "Error",
      details: error.response ? error.response.data : error.message,
    };
  }
};

// Función para obtener todos los pedidos de reparación (si la necesitas en algún momento)
export const fetchPedidosReparacion = async () => {
  try {
    const response = await axios.get('/pedidoReparacion/all');
    return {
      status: "Success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error al obtener los pedidos:", error.response ? error.response.data : error);
    return {
      status: "Error",
      details: error.response ? error.response.data : error.message,
    };
  }
};

// Función para obtener un pedido específico por su ID (si la necesitas en algún momento)
export const fetchPedidoReparacionById = async (id) => {
  try {
    const response = await axios.get('/pedidoReparacion/:id_PedidoReparacion'+ id);
    return {
      status: "Success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error al obtener el pedido:", error.response ? error.response.data : error);
    return {
      status: "Error",
      details: error.response ? error.response.data : error.message,
    };
  }
};

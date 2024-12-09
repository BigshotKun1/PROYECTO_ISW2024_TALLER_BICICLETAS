import axios from 'axios';
import { formatUserData } from '@helpers/formatData.js';



export const createPedidoReparacion = async (newPedido) => {
  try {
 
    const response = await axios.post('/pedidoReparacion', newPedido);
    

    return {
      status: "Success",
      data: response.data,
    };
  } catch (error) {
   
    console.error("Error al crear el pedido:", error.response ? error.response.data : error);
    return {
      status: "Error",
      details: error.response ? error.response.data : error.message,
    };
  }
};


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

import axios from './root.service.js';
import { formatUserData } from '@helpers/formatData.js';
/*
export async function createCliente(){
    try {
        const { data } = await axios.post('/cliente/');
        return data;
    } catch (error) {
        return error.response.data;
    }
}
*/
export async function createCliente(data) {
    try {
        // cliente contiene los datos necesarios para crear un cliente.
        const response = await axios.post('/cliente/', data);
        return response.data;
    } catch (error) {
        // Devuelve el mensaje de error del backend o un mensaje genérico si no hay respuesta.
        return error.response?.data || { message: "Error al crear el cliente" };
    }
}

/*
const createCliente = async (clienteData) => {
    try {
        const response = await axios.post('/cliente/', clienteData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error en la creación de cliente', error);
        throw error;
    }
};



*/

export default createCliente;

export async function getClientes() {
    try {
        const { data } = await axios.get('/cliente/all');
        const formattedData = data.data.map(formatUserData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

// Actualizar un cliente existente
// services/cliente.service.js
export const updateCliente = async (clienteData) => {
    try {
      const response = await fetch('/clientes/detail/', {
        method: 'POST',
        body: JSON.stringify(clienteData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('No se pudo actualizar el cliente');
      }
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      throw error; // Asegúrate de lanzar el error para manejarlo en el hook
    }
  };
  
/*
// Eliminar un cliente
export const deleteCliente = async (rut) => {
  try {
    const { data } = await axios.delete(`${API_URL}/${rut}`);
    return data;
  } catch (error) {
    throw error.response ? error.response.data.message : "Error al eliminar el cliente.";
  }
};*/

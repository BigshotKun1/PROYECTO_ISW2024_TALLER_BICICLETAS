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

// Función para crear un cliente y su bicicleta
export const createClienteBicicleta = async (newCliente) => {
  try {
    // Realizar la solicitud POST al backend para crear el cliente y la bicicleta
    const response = await axios.post("/cliente/crearClienteYBicicleta", newCliente,
      { headers: { "Content-Type": "application/json" } }
    );
    
    return {
      status: "Success",
      data: response.data,
    };
  } catch (error) {
    // Manejo de errores en la solicitud
    return {
      status: "Error",
      details: error.response?.data?.message || "Error desconocido",
    };
  }
};

// Servicio para obtener los clientes con bicicletas
export const obtenerClientesConBicicletas = async () => {
  try {
    // Asegúrate de usar la URL correcta de tu backend
    const response = await axios.get("/bicicleta/cbici"); // Ajusta la URL según tu backend

    // Verifica si la respuesta tiene el formato esperado
    if (
      !response.data ||
      !Array.isArray(response.data.data) ||
      response.data.status !== "Success"
    ) {
      throw new Error("El formato de la respuesta es incorrecto.");
    }

    // Devuelve la lista de clientes con bicicletas
    return response.data.data; // Asegúrate de que los datos que devuelves sean los correctos
  } catch (error) {
    console.error('Error al obtener clientes con bicicletas:', error);
    throw error; // Re-lanza el error para ser manejado en el componente
  }
};



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

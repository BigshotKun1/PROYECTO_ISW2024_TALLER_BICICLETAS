import axios from './root.service.js';

// Obtener todas las bicicletas
export const getBicicletas = async () => {
    try {
        const response = await axios.get('/bicicleta/all');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las bicicletas:', error);
        throw error;
    }
};


// Crear una nueva bicicleta
export const createBicicleta = async (bicicleta) => {
    try {
      const response = await axios.post('/bicicleta', bicicleta);
      return response.data;
    } catch (error) {
      console.error('Error al crear la bicicleta:', error);
      if (error.response) {
        console.error("Datos del error desde el servidor:", error.response.data);
        throw new Error(error.response.data.message || 'Error desconocido del servidor');
      } else if (error.request) {
        console.error("No hubo respuesta del servidor:", error.request);
        throw new Error('Error de red o el servidor no responde');
      } else {
        console.error("Error inesperado:", error.message);
        throw new Error('Ocurrió un error inesperado');
      }
    }
  };
  
/*
export const getBicicletasPorCliente = async (rut) => {
    try {
        const response = await axios.get(`/bicicleta/cliente/${rut}`);
        if (response.data && response.data.status === 'Success') {
        return response.data.data; // Bicicletas
    } else {
        throw new Error('El servidor devolvió un formato inesperado');
    }
} catch (error) {
    console.error('Error al obtener bicicletas:', error);
    throw error;
}
};

  */

/*
export const getBicicletasPorCliente = async (clienteId) => {
    try {
    const response = await axios.get(`/api/bicicletas/${clienteId}`);
    console.log("Datos de bicicletas recibidos:", response.data); // Ver los datos de la respuesta
    return response.data; // Devuelve los datos de las bicicletas
    } catch (error) {
    console.error("Error al obtener bicicletas:", error);
    if (error.response) {
      // Si la respuesta tiene un error del servidor
        console.error("Error del servidor:", error.response.data);
    } else {
      // Si no hay respuesta del servidor
        console.error("Error desconocido:", error.message);
    }
    throw new Error("El servidor devolvió un formato inesperado");
    }
};*/
/*
export const getBicicletasPorCliente = async (rut) => {
    try {
        const response = await axios.get(`bicicleta/cliente/${rut}`);
        if (response.headers['content-type'].includes('application/json')) {
            console.log("Datos de bicicletas recibidos:", response.data); // Verifica la respuesta
            return response.data; // Devuelve las bicicletas que obtuviste del servidor
        } else {
            console.error("Respuesta no es JSON:", response.data);
            throw new Error("El servidor devolvió un formato inesperado");
        }
    } catch (error) {
        console.error("Error al obtener bicicletas:", error);
        if (error.response) {
            // Si el error es del servidor, muestra el error del servidor
            console.error("Error del servidor:", error.response.data);
        } else if (error.request) {
            // Si no hubo respuesta del servidor
            console.error("No se recibió respuesta del servidor:", error.request);
        } else {
            // Otro tipo de error
            console.error("Error desconocido:", error.message);
        }
        throw new Error("El servidor devolvió un formato inesperado");
    }
};
*/
/*
// Eliminar una bicicleta
export const deleteBicicleta = async (id) => {
    try {
        const response = await axios.delete(`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar la bicicleta con ID ${id}:`, error);
        throw error;
    }
};
*/

export const getBicicletasPorCliente = async (rut) => {
    try {
      const response = await axios.get(`/bicicleta/cliente/${rut}`);
      return response.data; // Devuelve las bicicletas
    } catch (error) {
      console.error('Error al obtener bicicletas:', error);
      throw error;
    }
  };
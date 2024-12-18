import axios from './root.service.js';
import { formatUserData } from '@helpers/formatData.js';

export const createClienteBicicleta = async (data) => {
  try {
    // Realizamos la solicitud POST para crear cliente y bicicleta
    const response = await axios.post('/clienteBicicleta/', data);

    // Si la respuesta es exitosa, mostramos un mensaje de éxito
    console.log('Cliente y bicicleta creados exitosamente');
    return response.data; // O la respuesta que necesites manejar

  } catch (error) {
    // Manejo de errores: mostramos un mensaje si la creación falla
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message || 'Error desconocido';
      console.log('Error al crear cliente y bicicleta:', errorMessage);
      // Aquí podrías hacer que el frontend muestre el mensaje de error al usuario
    } else {
      // Si no hay respuesta detallada del backend, mostramos un error general
      console.log('Error desconocido:', error);
    }
    throw error; // Es importante lanzar el error para que el frontend pueda capturarlo si es necesario
  }
};

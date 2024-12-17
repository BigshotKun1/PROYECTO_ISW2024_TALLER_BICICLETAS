import axios from '-/rood.service.js';

export async function getMarcas() {
 try {
    const response = await axios.get(`/user/all`);
    return response.data.data;
 } catch (error) {
    console.error("Error al obtener Marcas:", error);
    throw error;
 }   
}

export async function createMarca(data) {
    try {
      const response = await axios.post('/user', data);
      return response.data;
    } catch (error) {
      console.error("Error al crear Marca:", error);
      throw error;
    }
  }
  
  export async function updateMarca(data, id) {
    try {
      const response = await axios.patch(`/user/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar Marca:", error);
      throw error;
    }
  }
  
  export async function deleteMarca(id) {
    try {
      const response = await axios.delete(`/user/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar Marca:", error);
      throw error;
    }
  }
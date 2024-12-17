import axios from '-/rood.service.js';

export async function getCategorias() {
 try {
    const response = await axios.get(`/user/all`);
    return response.data.data;
 } catch (error) {
    console.error("Error al obtener Categoria:", error);
    throw error;
 }   
}

export async function createCategoria(data) {
    try {
      const response = await axios.post('/user', data);
      return response.data;
    } catch (error) {
      console.error("Error al crear Categoria:", error);
      throw error;
    }
  }
  
  export async function updateCategoria(data, id) {
    try {
      const response = await axios.patch(`/user/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar Categoria:", error);
      throw error;
    }
  }
  
  export async function deleteCategoria(id) {
    try {
      const response = await axios.delete(`/user/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar Categoria:", error);
      throw error;
    }
  }
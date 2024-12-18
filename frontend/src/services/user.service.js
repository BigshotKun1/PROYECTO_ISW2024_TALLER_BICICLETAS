import axios from './root.service.js';

export async function getUsers() {
  try {
    const response = await axios.get(`/user/all`);
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}

export async function createUser(data) {
  try {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const response = await axios.post('/user', { ...data, currentUser });
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
}

export async function updateUser(data, rut) {
  try {
    const response = await axios.patch(`/user/${rut}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
}

export async function deleteUser(rut) {
  try {
    const response = await axios.delete(`/user/${rut}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
}
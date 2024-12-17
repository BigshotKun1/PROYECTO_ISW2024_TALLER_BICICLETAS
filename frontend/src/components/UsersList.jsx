/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { getUsers } from '@services/user.service';
import '@styles/users.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        setError(error.response?.data?.message || 'Error al obtener los usuarios');
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="users-list-container">
      <div className="title-container">
        <h1>Usuarios</h1>
      </div>
      {error && <p className="error">{error}</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>RUT</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.rut}>
              <td>{user.nombreCompleto}</td>
              <td>{user.rut}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Editar</button>
                <button onClick={() => handleDelete(user.rut)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
/*
  function handleEdit(user) {
    // Lógica para editar usuario
  }

  function handleDelete(rut) {
    // Lógica para eliminar usuario
  }
};
*/
};
export default UsersList;
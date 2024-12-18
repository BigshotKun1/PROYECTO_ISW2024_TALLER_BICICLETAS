import { useEffect, useState } from 'react';
import { getUsers, updateUser, deleteUser } from '@services/user.service';
import '@styles/users.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);

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

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (rut) => {
    try {
      await deleteUser(rut);
      setUsers(users.filter(user => user.rut !== rut));
    } catch (error) {
      setError(error.response?.data?.message || 'Error al eliminar el usuario');
    }
  };

  const handleUpdate = async (updatedUser) => {
    try {
      const response = await updateUser(updatedUser, updatedUser.rut);
      setUsers(users.map(user => (user.rut === updatedUser.rut ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Error al actualizar el usuario');
    }
  };

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
      {editingUser && (
        <EditUserForm user={editingUser} onUpdate={handleUpdate} onCancel={() => setEditingUser(null)} />
      )} 
    </div>
  );
};

const EditUserForm = ({ user, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
          />
        </label>
        <label>
          RUT:
          <input
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
            Nueva Contraseña:
            <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Ingrese una nueva contraseña"
        />
        </label>
        <label>
          Rol:
          <select name="rol" 
          value={formData.rol} 
          onChange={handleChange}>
            <option value="vendedor">Vendedor</option>
            <option value="mecanico">Mecánico</option>
            <option value="administrador">Administrador</option>
          </select>
        </label>
        <button type="submit">Actualizar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  </div>
  );
};

export default UsersList;
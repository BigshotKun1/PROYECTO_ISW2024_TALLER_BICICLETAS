import { useEffect, useState } from 'react';
import { getUsers, updateUser, deleteUser } from '@services/user.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@styles/users.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchRut, setSearchRut] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error al obtener los usuarios');
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
      setFilteredUsers(filteredUsers.filter(user => user.rut !== rut));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar el usuario');
    }
  };

  const handleUpdate = async (updatedUser) => {
    try {
      const response = await updateUser(updatedUser, updatedUser.rut);
      setUsers(users.map(user => (user.rut === updatedUser.rut ? response.data : user)));
      setFilteredUsers(filteredUsers.map(user => (user.rut === updatedUser.rut ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar el usuario');
    }
  };

  const handleSearch = () => {
    const filtered = users.filter(user => user.rut.includes(searchRut));
    if (filtered.length === 0) {
      toast.error('No se encontró el usuario con el RUT ingresado');
    }
    setFilteredUsers(filtered);
    if (searchRut.trim() === '') {
      setFilteredUsers(users);
      toast.error('No se encontró el usuario con el RUT ingresado');
    } else {
      const result = users.filter(user => user.rut === searchRut);
      setFilteredUsers(result.length > 0 ? result : []);
      if (result.length === 0) {
        toast.error('No se encontró el usuario con el RUT ingresado');
      }
    }
  };
  
  const compareRut = (a, b) => {
    const cleanRut = (rut) => rut.replace(/\./g, '').replace('-', '');
    const rutA = cleanRut(a);
    const rutB = cleanRut(b);
    return rutA.localeCompare(rutB, undefined, { numeric: true });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (key === 'rut') {
        return direction === 'asc' ? compareRut(a[key], b[key]) : compareRut(b[key], a[key]);
      } else {
        if (a[key] < b[key]) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      }});

    setFilteredUsers(sortedUsers);
  };

  const handleSearchChange = (e) => {
    setSearchRut(e.target.value);
    if (e.target.value.trim() === '') {
      setFilteredUsers(users);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '';
  };

  return (
    <div className="users-list-container">
      <div className="title-container">
        <h1>Usuarios</h1>
      </div>
      <ToastContainer />
      <table className="users-table">
        <thead>
          <tr>
          <th onClick={() => handleSort('nombreCompleto')}>Nombre Completo{getSortIndicator('nombreCompleto')}
          </th>
            <th onClick={() => handleSort('rut')}>RUT{getSortIndicator('rut')}
            </th>
            <th>Email</th>
            <th onClick={() => handleSort('rol')}>Rol{getSortIndicator('rol')} 
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
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
          ))
        ) : (
          <tr>
            <td colSpan="5">No se encontró el usuario con el RUT ingresado</td>
          </tr>
          )}
        </tbody>
      </table>
      <div className="search-container">
        <label htmlFor="searchRut">Buscar Usuario:</label>
        <input
          type="text"
          id="searchRut"
          value={searchRut}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          placeholder="Ingrese RUT"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {editingUser && (
        <EditUserForm user={editingUser}
        onUpdate={handleUpdate} onCancel={() => setEditingUser(null)} />
      )} 
    </div>
  );
};

const EditUserForm = ({ user, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({ ...user, password: '' }); 

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
            Contraseña:
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingrese la contraseña actual o una nueva"
            required
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
            <option value="superadmin">Superadmin</option>
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
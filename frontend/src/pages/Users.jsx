import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '@services/user.service';
import '@styles/users.css';

const CrearUser = () => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        rut: '',
        email: '',
        password: '',
        rol: 'vendedor', // Rol predeterminado
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createUser(formData);
        if (response) {
            navigate('/user/all');
        }
        } catch (error) {
            setError(error.response?.data?.message || 'Error al crear el usuario');
        }
    };

return (
    <div className="create-user-container">
        <div className="create-user-form">
        <h1>Crear Usuario</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
        <label>
            Nombre:
            <input
            type="text"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            placeholder="Emilio Alarcon Gomez"
            required
        />
        </label>
        <label>
            RUT:
            <input
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            placeholder="21.143.123-4"
            required
        />
        </label>
        <label>
            Email:
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Administrador2024@gmail.cl"
            required
        />
        </label>
        <label>
            Contraseña:
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingrese una contraseña"
            required
        />
        </label>
        <label>
        Rol:
            <select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="vendedor">Vendedor</option>
                <option value="mecanico">Mecánico</option>
                <option value="administrador">Administrador</option>
            </select>
            </label>
            <button type="submit">Crear Usuario</button>
        </form>
        <button className="view-users-button" onClick={() => navigate('/user/all')}>Ver Lista de Usuarios</button>
        </div>
    </div>
    );
};

export default CrearUser;
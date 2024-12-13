import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import '@styles/navbar.css';
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const userRole = user?.rol;
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutSubmit = () => {
        try {
            logout();
            sessionStorage.removeItem('usuario');
            navigate('/auth');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    return (
        <nav className="navbar">
            <div className="nav-menu-container">
                {/* Enlaces del lado izquierdo */}
                <div className="nav-left">
                    <NavLink
                        to="/home"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Inicio
                    </NavLink>

                    <NavLink
                        to="/quienes-somos"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Quiénes Somos
                    </NavLink>
                </div>

                {/* Enlaces del lado derecho */}
                <div className="nav-right">
                    {userRole === 'administrador' && (
                        <NavLink
                            to="/user"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Usuarios
                        </NavLink>
                    )}
                    {(userRole === 'administrador' || userRole === 'vendedor') && (
                        <NavLink
                            to="/productos"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Productos
                        </NavLink>
                    )}
                    {(userRole === 'administrador' || userRole === 'vendedor' || userRole === 'mecanico') && (
                        <NavLink
                            to="/cliente"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Clientes
                        </NavLink>
                    )}
                    {(userRole === 'administrador' || userRole === 'vendedor' || userRole === 'mecanico') && (
                        <NavLink
                            to="/pedidoReparacion"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Reparación General
                        </NavLink>
                    )}
                    {userRole === 'administrador' && (
                        <NavLink
                            to="/estadisticas"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Estadísticas
                        </NavLink>
                    )}
                    {!user ? (
                        <NavLink
                            to="/auth"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Login
                        </NavLink>
                    ) : (
                        <button
                            onClick={() => {
                                logoutSubmit();
                                setMenuOpen(false);
                            }}
                            className="logout-button"
                        >
                            Cerrar sesión
                        </button>
                    )}
                </div>
            </div>

            {/* Menú hamburguesa */}
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;

/*import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import '@styles/navbar.css';
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const userRole = user?.rol;
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutSubmit = () => {
        try {
            logout();
            navigate('/auth'); 
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleMenu = () => {
        if (!menuOpen) {
            removeActiveClass();
        } else {
            addActiveClass();
        }
        setMenuOpen(!menuOpen);
    };

    const removeActiveClass = () => {
        const activeLinks = document.querySelectorAll('.nav-menu ul li a.active');
        activeLinks.forEach(link => link.classList.remove('active'));
    };

    const addActiveClass = () => {
        const links = document.querySelectorAll('.nav-menu ul li a');
        links.forEach(link => {
            if (link.getAttribute('href') === location.pathname) {
                link.classList.add('active');
            }
        });
    };

    return (
        <nav className="navbar">
            <div className={`nav-menu ${menuOpen ? 'activado' : ''}`}>
                <ul>
                    <li>
                        <NavLink 
                            to="/home" 
                            onClick={() => { 
                                setMenuOpen(false); 
                                addActiveClass();
                            }} 
                            activeClassName="active"
                        >
                            Inicio
                        </NavLink>
                    </li>
                    {userRole === 'administrador' && (
                    <li>
                        <NavLink 
                            to="/users" 
                            onClick={() => { 
                                setMenuOpen(false); 
                                addActiveClass();
                            }} 
                            activeClassName="active"
                        >
                            Usuarios
                        </NavLink>
                    </li>
                    )}
                    <li>
                        <NavLink 
                            to="/auth" 
                            onClick={() => { 
                                logoutSubmit(); 
                                setMenuOpen(false); 
                            }} 
                            activeClassName="active"
                        >
                            Cerrar sesión
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar; */

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
            <div className={`nav-menu ${menuOpen ? 'activado' : ''}`}>
                <div className="nav-menu-container">
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
                    <div className="nav-right">
                        {userRole === 'administrador' && (
                            <li>
                                <NavLink 
                                    to="/user" 
                                    onClick={() => setMenuOpen(false)} 
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    Usuarios
                                </NavLink>
                            </li>
                        )}
                    
                        {(userRole === 'administrador' || userRole === 'vendedor') && (
                            <li>
                                <NavLink 
                                    to="/productos" 
                                    onClick={() => setMenuOpen(false)} 
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    Productos
                                </NavLink>
                            </li>
                        )}

                            {(userRole === 'administrador' || userRole === 'vendedor' || userRole === 'mecanico') && (
                            <li>
                                <NavLink 
                                    to="/cliente" 
                                    onClick={() => setMenuOpen(false)} 
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    Clientes
                                </NavLink>
                            </li>
                        )}

                            {(userRole === 'administrador' || userRole === 'vendedor') && (
                            <li>
                                <NavLink 
                                    to="/ReparacionGeneral" 
                                    onClick={() => setMenuOpen(false)} 
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    Reparacion General
                                </NavLink>
                            </li>
                        )}

                            {(userRole === 'administrador') && (
                            <li>
                                <NavLink 
                                    to="/estadisticas" 
                                    onClick={() => setMenuOpen(false)} 
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    Estadísticas
                                </NavLink>
                            </li>
                        )}
                        {/* Mostrar login y registro si el usuario no está autenticado */}
                        {!user ? (
                            <>
                                <li>
                                    <NavLink 
                                        to="/auth" 
                                        onClick={() => setMenuOpen(false)} 
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <li>
                                <button 
                                    onClick={() => { 
                                        logoutSubmit(); 
                                        setMenuOpen(false); 
                                    }}
                                    className="logout-button"
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        )}
                    </div>
            </div>
            {/* Botón Hamburguesa */}
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;

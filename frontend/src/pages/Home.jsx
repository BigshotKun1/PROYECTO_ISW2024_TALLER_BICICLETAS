/* import { useEffect, useState } from 'react';
import backgroundImage from '../assets/IMAGEN INSANA DE LAS BICICLETAS.jpg';

const Home = () => {
  const [usuario, setUsuario] = useState(null);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
  };

  return <div style={backgroundStyle}>Contenido aquí</div>;
 };

  useEffect(() => {
    // Obtener datos del usuario desde sessionStorage
    const userData = sessionStorage.getItem('usuario');
    if (userData) {
      setUsuario(JSON.parse(userData));
    }
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px', marginTop: '100px' }}>
        <h1>Bienvenido{usuario ? `, ${usuario.nombreCompleto}` : ''}</h1>
        <p>{usuario ? `Rol: ${usuario.rol}` : 'Por favor inicia sesión para acceder a más funcionalidades.'}</p>
      </header>

      <nav style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <a href="/productos" style={{ textDecoration: 'none', color: 'blue' }}>Productos</a>
        <a href="/reparaciones" style={{ textDecoration: 'none', color: 'blue' }}>Reparaciones</a>
        <a href="/clientes" style={{ textDecoration: 'none', color: 'blue' }}>Clientes</a>
      </nav>

      <main style={{ marginTop: '30px' }}>
        <h2>Panel de {usuario ? usuario.rol : 'Usuario'}</h2>
        <p>Accede a las funcionalidades según tu rol.</p>
        {usuario?.rol === 'mecánico' && <p>Revisar pedidos en espera o en reparación.</p>}
        {usuario?.rol === 'vendedor' && <p>Gestión de clientes y productos.</p>}
        {usuario?.rol === 'administrador' && <p>Administración general del sistema.</p>}
      </main>
    </div>
  );
};

export default Home; 


*/

import '../styles/home-background.css';
import { useEffect, useState } from 'react';

const Home = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem('usuario');
    if (userData) {
      setUsuario(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="home-background">
      <div className="background-overlay"></div> 
      <div className="text-container">
        <header style={{ textAlign: 'center', marginBottom: '30px', marginTop: '100px' }}>
          <h1>TALLER BICICLETAS UBB</h1>
          <div className="user-info">
            <span className="user-name">{usuario?.nombreCompleto}</span>
            <span className="user-role">{usuario?.rol}</span>
          </div>
        </header>

        <main>
          <h2>Panel de {usuario ? usuario.rol : 'Usuario'}</h2>
          {usuario?.rol === 'mecánico' && <p>Revisar pedidos en espera o en reparación.</p>}
          {usuario?.rol === 'vendedor' && <p>Gestión de clientes y productos.</p>}
          {usuario?.rol === 'administrador' && <p>Administración general del sistema.</p>}
        </main>
      </div>
    </div>
  );
};

export default Home;


/*<nav style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <a href="/productos" style={{ textDecoration: 'none', color: 'white' }}>Productos</a>
          <a href="/reparaciones" style={{ textDecoration: 'none', color: 'blue' }}>Reparaciones</a>
          <a href="/clientes" style={{ textDecoration: 'none', color: 'blue' }}>Clientes</a>
        </nav> */
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [usuario, setUsuario] = useState(null);

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

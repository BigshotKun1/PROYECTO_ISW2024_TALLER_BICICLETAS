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
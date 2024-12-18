import useMarcas from '@hooks/marcas/useMarcas'; 
import '@styles/marcas.css'; 
import MarcasList from '@components/MarcasList';

const MarcasTab = () => {
  const { marcas, loading, error } = useMarcas(); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="marcas-container">
      <MarcasList marcas={marcas} /> 
      <button onClick={() => handleCreate()}>Crear Marca</button>
    </div>
  );
};

const handleCreate = () => {
  console.log('Crear nueva marca');
};

export default MarcasTab;

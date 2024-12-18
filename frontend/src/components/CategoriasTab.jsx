import useCategorias from '@hooks/categorias/useCategorias'; 
import '@styles/categorias.css'; 
import CategoriaList from '@components/CategoriasList';

const CategoriaTab = () => {
  const { categorias, loading, error } = useCategorias(); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  console.log("Categorías recibidas en CategoriasTab:", categorias);

  return (
    <div className="categorias-container">
      <CategoriaList categorias={categorias} /> 
      <button onClick={() => handleCreate()}>Crear Categoría</button>
    </div>
  );
};

const handleCreate = () => {
  console.log('Crear nueva categoría');
};

export default CategoriaTab;

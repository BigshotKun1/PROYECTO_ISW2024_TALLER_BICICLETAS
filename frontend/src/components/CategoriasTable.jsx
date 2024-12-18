const CategoriaTable = ({ categorias }) => {
    const handleDelete = (id) => {
      // Lógica para eliminar categoría
    };
  
    const handleEdit = (id) => {
      // Lógica para editar categoría
    };
  
    return (
      <table className="categorias-table">
        <thead>
          <tr>
            <th>Nombre de Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.idC}>
              <td>{categoria.nombre}</td>
              <td>
                <button onClick={() => handleEdit(categoria.idC)}>Editar</button>
                <button onClick={() => handleDelete(categoria.idC)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default CategoriaTable;
  
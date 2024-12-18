
const MarcasTable = ({ marcas }) => {
  const handleDelete = (id) => {
    // Lógica para eliminar marca
  };

  const handleEdit = (id) => {
    // Lógica para editar marca
  };

  return (
    <table className="marcas-table">
      <thead>
        <tr>
          <th>Nombre de Marca</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {marcas.map((marca) => (
          <tr key={marca.idM}>
            <td>{marca.marcas}</td>
            <td>
              <button onClick={() => handleEdit(marca.idM)}>Editar</button>
              <button onClick={() => handleDelete(marca.idM)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MarcasTable;

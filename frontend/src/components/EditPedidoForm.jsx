import { useState } from 'react';

const EditPedidoForm = ({ pedido, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({ ...pedido });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Pedido</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Motivo Reparación:
            <input
              type="text"
              name="motivoReparacion"
              value={formData.motivoReparacion}
              onChange={handleChange}
            />
          </label>
          <label>
            Descripción Reparación:
            <textarea
              name="descripcionReparacion"
              value={formData.descripcionReparacion}
              onChange={handleChange}
              rows="4"
            />
          </label>
          <label>
            Estado:
            <select name="estadoReparacion" value={formData.estadoReparacion?.estados_r} onChange={handleChange}>
              <option value="En reparación">En reparación</option>
              <option value="Finalizado">Finalizado</option>
              <option value="En espera por falta de repuestos">En espera por falta de repuestos</option>
            </select>
          </label>
          <button type="submit">Actualizar</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default EditPedidoForm;

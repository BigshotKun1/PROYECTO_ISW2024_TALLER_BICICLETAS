import { useForm } from "react-hook-form";
import { useState } from "react";
import "@styles/clientes.css";
import "@styles/boton.css";

const BicicletaForm = ({ onSubmit, clientesSinBicicleta }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formError, setFormError] = useState(null);

  // Este array contiene los campos del formulario de bicicleta
  const fields = [
    {
      label: "Marca de la bicicleta",
      name: "marca",
      placeholder: "Trek",
      fieldType: "input",
      type: "text",
      required: true
    },
    {
      label: "Modelo de la bicicleta",
      name: "modelo",
      placeholder: "Marlin 7",
      fieldType: "input",
      type: "text",
      required: true
    },
    {
      label: "Color de la bicicleta",
      name: "color",
      placeholder: "Rojo",
      fieldType: "input",
      type: "text",
      required: true
    }
  ];

  // Función de envío del formulario
  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      // Aquí puedes agregar la recarga de la página si es necesario
    } catch (error) {
      console.error("Error al crear la bicicleta:", error.response ? error.response.data : error.message);
      setFormError(error.response ? error.response.data.message : "Error al crear bicicleta.");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="create-cliente-form">
      <h1>Registrar Bicicleta</h1>

      {/* Mensaje de error general del formulario */}
      {formError && <p className="error-message">{formError}</p>}

      {/* Selección de Cliente */}
      <div className="form-group">
        <label htmlFor="clienteRut">Seleccionar Cliente:</label>
        <select
          id="clienteRut"
          {...register("clienteRut", { required: "Selecciona un cliente" })}
        >
          <option value="">Seleccionar una opción</option>
          {clientesSinBicicleta && clientesSinBicicleta.length > 0 ? (
            clientesSinBicicleta.map(cliente => (
              <option key={cliente.rut} value={cliente.rut}>
                {`${cliente.nombreCompleto} (${cliente.rut})`}
              </option>
            ))
          ) : (
            <option value="">No hay clientes disponibles</option>
          )}
        </select>
        {errors.clienteRut && <span className="error">{errors.clienteRut.message}</span>}
      </div>

      {/* Mapea los campos para crear los inputs */}
      {fields.map(field => (
        <div key={field.name} className="form-group">
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name, { required: field.required ? `${field.label} es obligatorio` : false })}
          />
          {errors[field.name] && <span className="error">{errors[field.name]?.message}</span>}
        </div>
      ))}

      {/* Botón de envío */}
      <button type="submit" className="btn btn-1" disabled={Object.keys(errors).length > 0}>
        Registrar Bicicleta
      </button>
    </form>
  );
};

export default BicicletaForm;

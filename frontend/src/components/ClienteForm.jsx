import { useForm } from "react-hook-form";
import { useState } from "react";
import "@styles/clientes.css";
import "@styles/boton.css";

const ClienteForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formError, setFormError] = useState(null);

  // Configuración dinámica de los campos del formulario
  const formFields = [
    {
      label: "Nombre Completo",
      name: "nombreCompleto",
      placeholder: "Juan Pérez",
      type: "text",
      validation: { required: "El nombre es obligatorio" },
    },
    {
      label: "RUT",
      name: "rut",
      placeholder: "12.345.678-9",
      type: "text",
      validation: { 
        required: "El RUT es obligatorio",
        pattern: {
          value: /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/,
          message: "Debe ser xx.xxx.xxx-x",
        }
      },
    },
    {
      label: "Teléfono",
      name: "telefono",
      placeholder: "(+56) 912345678",
      type: "text",
      validation: { 
        required: "El teléfono es obligatorio",
        pattern: {
          value: /^\+56(9\d{8})$/,
          message: "Debe ser un número válido en el formato +56912345678",
        }
      },
    },
  ];

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Verificar si el error es debido al RUT duplicado
        if (error.response.data.message.includes("RUT ya está asignado")) {
          setFormError("Este RUT ya está asignado a otro cliente.");
        } else {
          setFormError(error.message || "Error al crear cliente.");
        }
      } else {
        setFormError("Ocurrió un error inesperado.");
      }
    }
  };


  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="create-cliente-form">
      <h1>Registrar Cliente</h1>
      {formError && <p className="error-message">{formError}</p>}

      {/* Renderizar campos dinámicamente */}
      {formFields.map((field, index) => (
        <div key={index} className="form-group">
          <label htmlFor={field.name}>{field.label}:</label>
          <input
            id={field.name}
            placeholder={field.placeholder}
            type={field.type}
            {...register(field.name, field.validation)}
          />
          {errors[field.name] && <span className="error">{errors[field.name].message}</span>}
        </div>
      ))}

      <button type="submit" className="btn btn-primary">
        Crear Cliente
      </button>
    </form>
  );
};

export default ClienteForm;

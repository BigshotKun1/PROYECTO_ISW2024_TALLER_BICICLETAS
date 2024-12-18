import { useForm } from "react-hook-form";
import { useState } from "react";
import "@styles/Formulario.css";
import "@styles/boton.css";

const ClienteBicicletaForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formError, setFormError] = useState(null);
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
    {
      label: "Marca de la bicicleta",
      name: "marca",
      placeholder: "Trek",
      type: "text",
      validation: { required: "La marca de la bicicleta es obligatoria" },
    },
    {
      label: "Modelo de la bicicleta",
      name: "modelo",
      placeholder: "Marlin 7",
      type: "text",
      validation: { required: "El modelo de la bicicleta es obligatorio" },
    },
    {
      label: "Color de la bicicleta",
      name: "color",
      placeholder: "Rojo",
      type: "text",
      validation: { required: "El color de la bicicleta es obligatorio" },
    },
  ];

  // Esta función se llama cuando el formulario se envía
  const handleFormSubmit = async (data) => {
    const clienteBicicletaData = {
      rut: data.rut,
      nombreCompleto: data.nombreCompleto,
      telefono: data.telefono,
      bicicleta: {
        marca: data.marca,
        modelo: data.modelo,
        color: data.color,
      },
    };
  
    console.log("Datos enviados clienteBicicletaForm:", clienteBicicletaData);
  
    try {
      // Llama a la función `onSubmit` pasada desde el componente padre
      await onSubmit(clienteBicicletaData);
      console.log("Cliente y bicicleta creados exitosamente.");
      setFormError(null); // Limpia errores en caso de éxito
    } catch (error) {
      // Muestra el mensaje de error del backend en el formulario
      setFormError(error.details || "Error al crear cliente y bicicleta.");
    }
  };
  
  

  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="create-cliente-form">
      <h1>Registrar Cliente y Bicicleta</h1>
      {formError && <p className="error-message">{formError}</p>}

      {/* Renderizar los campos dinámicamente */}
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
        Registrar Cliente y Bicicleta
      </button>
    </form>
  );
};

export default ClienteBicicletaForm;

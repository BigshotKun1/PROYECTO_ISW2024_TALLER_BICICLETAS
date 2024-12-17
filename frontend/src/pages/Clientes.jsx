import { useNavigate } from "react-router-dom";
import { createClienteBicicleta } from "@services/cliente.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "@components/Form";
import '@styles/boton.css';

const Clientes = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState("createCliente"); // Inicializa con "createCliente"

  const [newCliente, setNewCliente] = useState({
    rut: "",
    nombreCompleto: "",
    telefono: "",
    bicicleta: {
      marca: "",
      modelo: "",
      color: "",
    },
  });

  const handleInputChange = (name, value) => {
    if (name === 'marca' || name === 'modelo' || name === 'color') {
      setNewCliente((prev) => ({
        ...prev,
        bicicleta: {
          ...prev.bicicleta,
          [name]: value,
        },
      }));
    } else {
      setNewCliente((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    console.log("Datos enviados:", newCliente);
    try {
      const response = await createClienteBicicleta(newCliente);
      if (response.status === "Success") {
        showSuccessAlert("¡Cliente creado!", "Cliente creado exitosamente.");
        setTimeout(() => {
          navigate("/cliente/all");
        }, 3000);
      } else {
        throw new Error(response.details || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al crear el cliente:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Error desconocido.");
      showErrorAlert("Error", error.response?.data?.message || "Ocurrió un error al crear el cliente.");
    }
  };

  // Función para cambiar el formulario según el bloque seleccionado
  const renderForm = () => {
    switch (selectedForm) {
      case "createCliente":
        return (
          <Form
            title="Registrar Cliente"
            fields={[
              {
                label: "Nombre",
                name: "nombreCompleto",
                placeholder: "Juan Pérez",
                fieldType: "input",
                type: "text",
                required: true,
                onChange: (e) => handleInputChange('nombreCompleto', e.target.value),
                value: newCliente.nombreCompleto,
              },
              {
                label: "RUT",
                name: "rut",
                placeholder: "12.345.678-9",
                fieldType: "input",
                type: "text",
                required: true,
                pattern: /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/,
                patternMessage: "Debe ser xx.xxx.xxx-x",
                onChange: (e) => handleInputChange('rut', e.target.value),
              },
              {
                label: "Teléfono",
                name: "telefono",
                placeholder: "(+56) 912345678",
                fieldType: "input",
                type: "text",
                required: true,
                pattern: /^\+56(9\d{8})$/,
                patternMessage: "Debe ser un número válido en el formato +56912345678",
                onChange: (e) => handleInputChange('telefono', e.target.value),
                value: newCliente.telefono,
              },
            ]}
            buttonText="Registrar Cliente"
            onSubmit={handleSubmit}
          />
        );
      case "createClienteAndBicycle":
        return (
          <Form
            title="Registrar Cliente y Bicicleta"
            fields={[
              {
                label: "Nombre",
                name: "nombreCompleto",
                placeholder: "Juan Pérez",
                fieldType: "input",
                type: "text",
                required: true,
                onChange: (e) => handleInputChange('nombreCompleto', e.target.value),
                value: newCliente.nombreCompleto,
              },
              {
                label: "RUT",
                name: "rut",
                placeholder: "12.345.678-9",
                fieldType: "input",
                type: "text",
                required: true,
                pattern: /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/,
                patternMessage: "Debe ser xx.xxx.xxx-x",
                onChange: (e) => handleInputChange('rut', e.target.value),
              },
              {
                label: "Teléfono",
                name: "telefono",
                placeholder: "(+56) 912345678",
                fieldType: "input",
                type: "text",
                required: true,
                pattern: /^\+56(9\d{8})$/,
                patternMessage: "Debe ser un número válido en el formato +56912345678",
                onChange: (e) => handleInputChange('telefono', e.target.value),
                value: newCliente.telefono,
              },
              {
                label: "Marca de la bicicleta",
                name: "marca",
                placeholder: "Trek",
                fieldType: "input",
                type: "text",
                required: true,
                onChange: (e) => handleInputChange('marca', e.target.value),
                value: newCliente.bicicleta.marca,
              },
              {
                label: "Modelo de la bicicleta",
                name: "modelo",
                placeholder: "Marlin 7",
                fieldType: "input",
                type: "text",
                required: true,
                onChange: (e) => handleInputChange('modelo', e.target.value),
                value: newCliente.bicicleta.modelo,
              },
              {
                label: "Color de la bicicleta",
                name: "color",
                placeholder: "Rojo",
                fieldType: "input",
                type: "text",
                required: true,
                onChange: (e) => handleInputChange('color', e.target.value),
                value: newCliente.bicicleta.color,
              },
            ]}
            buttonText="Registrar Cliente y Bicicleta"
            onSubmit={handleSubmit}
          />
        );
      case "createBicycle":
        return (
          <Form
            title="Registrar Bicicleta"
            fields={[
              {
                label: "Marca de la bicicleta",
                name: "marca",
                placeholder: "Trek",
                fieldType: "input",
                type: "text",
                required: true,
                onChange: (e) => handleInputChange('marca', e.target.value),
                value: newCliente.bicicleta.marca,
              },
              {
                label: "Modelo de la bicicleta",
                name: "modelo",
                placeholder: "Marlin 7",
                fieldType: "input",
                type: "text",
                required: true,
                onChange: (e) => handleInputChange('modelo', e.target.value),
                value: newCliente.bicicleta.modelo,
              },
              {
                label: "Color de la bicicleta",
                name: "color",
                placeholder: "Rojo",
                fieldType: "input",
                type: "text",
                required: true,
                onChange: (e) => handleInputChange('color', e.target.value),
                value: newCliente.bicicleta.color,
              },
            ]}
            buttonText="Registrar Bicicleta"
            onSubmit={handleSubmit}
          />
        );
      default:
        return <p>Selecciona una opción para registrar.</p>;
    }
  };

  return (
    <main className="container" style={{ display: "flex" }}>
      <div style={{ width: "300px", marginRight: "300px" }} className="buttons">
        <button
          className="btn btn-1"
          onClick={() => setSelectedForm("createCliente")}
        >
          Crear Cliente
        </button>
        <button
          className="btn btn-1"
          onClick={() => setSelectedForm("createClienteAndBicycle")}
        >
          Crear Cliente y Bicicleta
        </button>
        <button
          className="btn btn-1"
          onClick={() => setSelectedForm("createBicycle")}
        >
          Crear Bicicleta
        </button>
        <button
          className="btn btn-1"
          onClick={() => navigate("/bicicleta/cbici")}
        >
          Lista Clientes
        </button>
      </div>
      <div style={{ flex: 1 }}>
        {renderForm()}
      </div>
    </main>
  );
};

export default Clientes;

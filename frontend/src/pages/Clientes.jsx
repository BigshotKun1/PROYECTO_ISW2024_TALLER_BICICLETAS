import { useNavigate } from "react-router-dom";
import { createClienteBicicleta, createCliente, obtenerClientesSinBicicleta } from "@services/cliente.service.js";
import { createBicicleta } from "@services/bicicleta.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "@components/Form";
import '@styles/boton.css';


const Clientes = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState("createCliente"); // Inicializa con "createCliente"
  const [clientesSinBicicleta, setClientesSinBicicleta] = useState([]);
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

  
  useEffect(() => {
    const fetchClientesSinBicicleta = async () => {
      try {
        const response = await obtenerClientesSinBicicleta();
        
        // Verifica si la respuesta contiene un array
        if (Array.isArray(response.clientes)) {
          setClientesSinBicicleta(response.clientes);
        } else {
          setClientesSinBicicleta([]);
        }
      } catch (err) {
        console.error("Error al obtener clientes sin bicicleta", err);
        setError("Error al obtener los clientes.");
      }
    };
    fetchClientesSinBicicleta();
  }, []);

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
    try {
      console.log("Datos enviados Handle:", newCliente);
  
      let response;
  
      // Dependiendo del formulario seleccionado, se realiza la solicitud correspondiente
      if (selectedForm === "createCliente") {
        response = await createCliente({
          rut: newCliente.rut,
          nombreCompleto: newCliente.nombreCompleto,
          telefono: newCliente.telefono,
        });
      } else if (selectedForm === "createClienteAndBicycle") {
        const clienteConBicicleta = {
          rut: newCliente.rut,
          nombreCompleto: newCliente.nombreCompleto,
          telefono: newCliente.telefono,
          bicicleta: newCliente.bicicleta,
        };
        response = await createClienteBicicleta(clienteConBicicleta);
      } else if (selectedForm === "createBicycle") {
        response = await createBicicleta({ bicicleta: newCliente.bicicleta, clienteRut: newCliente.rut });
      }
  
      // Verificar la respuesta recibida del servidor
      console.log("Respuesta del servidor:", response);
  
      // Si la respuesta es exitosa, mostrar el mensaje de éxito
      if (response.status === "Success") {
        showSuccessAlert("¡Operación exitosa!", response.message);  // Mostrar mensaje de éxito
      } else {
        // En caso de que no sea "Success", lanzar un error
        throw new Error(response.message || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      setError(error.message || "Error desconocido.");
      showErrorAlert("Error", error.message || "Ocurrió un error.");
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
                label: "Seleccionar Cliente",
                name: "cliente",
                fieldType: "select",
                options: clientesSinBicicleta.map(cliente => ({
                  label: `${cliente.nombreCompleto} (${cliente.rut})`,
                  value: cliente.rut
                })),
                onChange: (e) => {
                  const selectedRut = e.target.value;
                  const selectedClient = clientesSinBicicleta.find(cliente => cliente.rut === selectedRut);
                  setNewCliente((prev) => ({
                    ...prev,
                    rut: selectedRut,
                    nombreCompleto: selectedClient ? selectedClient.nombreCompleto : '',
                    telefono: selectedClient ? selectedClient.telefono : '',
                  }));
                },
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

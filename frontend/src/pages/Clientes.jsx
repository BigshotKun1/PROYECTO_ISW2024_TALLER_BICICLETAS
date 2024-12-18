/*
import { useNavigate } from "react-router-dom";
import { createClienteBicicleta, createCliente, obtenerClientesSinBicicleta } from "@services/cliente.service.js";
import { createBicicleta } from "@services/bicicleta.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "@components/Form";
import '@styles/boton.css';
import '@styles/clientes.css';
import ClienteForm from '@components/crearCliente'; // Importar el formulario de cliente



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
*/
import { useState, useEffect } from "react";
import { obtenerClientesSinBicicleta, createCliente} from "@services/cliente.service.js";
import { createBicicleta } from "@services/bicicleta.service.js";
import { createClienteBicicleta } from "@services/clienteBicicleta.service.js";
import ClienteForm from "@components/ClienteForm";
import ClienteBicicletaForm from "@components/ClienteBicicletaForm";
import BicicletaForm from "@components/BicicletaForm";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import "@styles/boton.css"; // Asegúrate de que el CSS se importe correctamente
import "@styles/clientes.css"; // Asegúrate de que el CSS se importe correctamente
const Clientes = () => {
  const [selectedForm, setSelectedForm] = useState("cliente");
  const [clientesSinBicicleta, setClientesSinBicicleta] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const { clientes } = await obtenerClientesSinBicicleta();
        console.log("Clientes obtenidos:", clientes); // Verifica que lleguen los clientes correctamente
        setClientesSinBicicleta(clientes || []);
      } catch (error) {
        console.error("Error al obtener clientes:", error); // Verifica si hay algún error con la API
      }
    };
    fetchClientes();
  }, []);
  
  

  // Funciones de manejo de envío
  const handleSubmitCliente = async (data) => {
    const clientedesglozado = {
      rut: data.rut,
      nombreCompleto: data.nombreCompleto,
      telefono: data.telefono,
    };
  
    try {
      const response = await createCliente(clientedesglozado);
      if (response.status === 'Client error') {
        // Si el servidor devuelve un error relacionado con el RUT duplicado
        showErrorAlert(response.message);  // Muestra el mensaje de error
      } else {
        showSuccessAlert("Cliente creado exitosamente.");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      showErrorAlert(error.message || "Error al crear cliente.");
    }
  };
  
  const handleSubmitClienteBicicleta = async (data) => {
    console.log("Datos enviados al backend:", data);
    try {
      await createClienteBicicleta(data);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      showSuccessAlert("Cliente y bicicleta creados exitosamente.");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "Ya existe un cliente con el mismo rut") {
          showErrorAlert("Este rut ya está registrado. Por favor, ingrese otro.");
        } else {
          showErrorAlert(errorMessage || "Ocurrió un error al registrar el cliente y la bicicleta.");
        }
      } else {
        showErrorAlert(error.message || "Ocurrió un error inesperado.");
      }
    }
  };
  

  const handleSubmitBicicleta = async (data) => {
    try {
      await createBicicleta(data);
      showSuccessAlert("Bicicleta creada exitosamente.");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      showErrorAlert(`Error al crear la bicicleta: ${error.message}`);
    }
  };
  
  

  // Renderizar el formulario seleccionado dinámicamente
  const renderForm = () => {
    switch (selectedForm) {
      case "cliente":
        return <ClienteForm onSubmit={handleSubmitCliente} />;
      case "clienteBicicleta":
        return <ClienteBicicletaForm onSubmit={handleSubmitClienteBicicleta} />;
      case "bicicleta":
        return <BicicletaForm onSubmit={handleSubmitBicicleta} clientesSinBicicleta={clientesSinBicicleta} />;
      default:
        return <p>Seleccione un formulario válido.</p>;
    }
  };

  return (
    <div className="create-user-container">
      {/* Botones para cambiar entre formularios */}
      <div className="container">
      <div className="buttons">
        <boton className="btn btn-1" onClick={() => setSelectedForm("cliente")}>
          Crear Cliente
        </boton>
        <boton className="btn btn-1" onClick={() => setSelectedForm("clienteBicicleta")}>
          Crear Cliente y Bicicleta
        </boton>
        <boton className="btn btn-1" onClick={() => setSelectedForm("bicicleta")}>
          Crear Bicicleta
        </boton>
      </div>

      {/* Renderizado del formulario correspondiente */}
      <div className="create-user-container">
        {renderForm()}
      </div>
      </div>
    </div>
  );
};

export default Clientes;

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

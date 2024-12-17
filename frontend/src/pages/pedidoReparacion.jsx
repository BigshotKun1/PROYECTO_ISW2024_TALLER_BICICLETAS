import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPedidoReparacion } from "@services/PedidoReparacion.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { getClientes } from "@services/cliente.service.js"; // Servicio para obtener los clientes
import { getBicicletasPorCliente } from "@services/bicicleta.service.js"; // Servicio para obtener las bicicletas por cliente
import Form from "@components/Form";
import { Link } from "react-router-dom";

const PedidoReparacion = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [bicicletas, setBicicletas] = useState([]);
  const [motivosReparacion, setMotivosReparacion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPedido, setNewPedido] = useState({
    clienteRut: "",
    id_Bicicleta: "",
    motivoReparacion: "",
  });
  const [error, setError] = useState(null);

  // Obtener la lista de clientes al cargar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const clientesResponse = await getClientes();
        setClientes(clientesResponse);

        // Si no hay clientes, evitar que se carguen las bicicletas
        if (clientesResponse.length > 0) {
          setNewPedido((prev) => ({
            ...prev,
            clienteRut: clientesResponse[0].id, // Asignamos un cliente por defecto
          }));
        }
      } catch (err) {
        console.error("Error al cargar los clientes:", err);
      }
    };
    loadData();
  }, []);

  // Obtener las bicicletas al cambiar el cliente
  
  useEffect(() => {
    console.log(newPedido.clienteRut);
    if (newPedido.clienteRut) {
      const loadBicicletas = async () => {
        console.log("Cliente ID (rut) que se envía:", newPedido.clienteRut); // Verifica el rut antes de hacer la solicitud
        try {
          const bicicletasResponse = await getBicicletasPorCliente(newPedido.clienteRut.trim());
          // Verifica toda la respuesta que viene del servidor
          console.log("Respuesta completa de bicicletas:", bicicletasResponse);
          console.log("Datos de bicicletas:", bicicletasResponse.data);
  
          // Verifica si la propiedad 'data' contiene un array de bicicletas
          if (bicicletasResponse && bicicletasResponse.data && Array.isArray(bicicletasResponse.data) && bicicletasResponse.data.length > 0) {
            setBicicletas(bicicletasResponse.data); // Asigna las bicicletas
          } else {
            setBicicletas([]); // Si no hay bicicletas, asigna un array vacío
          }
          console.log("Respuesta de la API:", bicicletasResponse);

        } catch (err) {
          console.error("Error al cargar las bicicletas:", err);
          setBicicletas([]); // Si hay un error, asigna un array vacío
        }
      
      };
      loadBicicletas();
    }
  }, [newPedido.clienteRut]); 
  

  // Crear opciones de bicicletas para el select
  const bicicletaOptions = bicicletas.map((bicicleta) => ({
    value: bicicleta.id_Bicicleta,
    label: `${bicicleta.marca} ${bicicleta.modelo} (${bicicleta.color})`,
  }));

  const handleInputChange = (name, value) => {
    if (name === "clienteRut") {
      // Extrae solo el RUT del valor
      const rut = value.match(/\(([^)]+)\)/); // Busca el texto dentro de paréntesis
      if (rut && rut[1]) {
        value = rut[1]; // Si se encuentra el RUT, asignarlo
      }
    }
  
    setNewPedido((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleSubmit = async () => {
    // Validación básica
    if (!newPedido.clienteRut || !newPedido.id_Bicicleta || !newPedido.motivoReparacion) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    console.log("Datos del pedido de reparación antes de enviar:", newPedido); // Verifica los datos

    try {
      const response = await createPedidoReparacion(newPedido);
      if (response.status === "Success") {
        showSuccessAlert("¡Pedido creado!", "Pedido de reparación creado exitosamente.");
        setTimeout(() => {
          navigate("/pedidoReparacion/all");
        }, 3000);
      } else {
        throw new Error(response.details || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al crear el pedido de reparación:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Error desconocido.");
      showErrorAlert("Error", error.response?.data?.message || "Ocurrió un error al crear el pedido.");
    }
  };

  return (
    <main className="container">
      <Form
        title="Crear Pedido de Reparación"
        fields={[
          {
            label: "Cliente",
            name: "clienteRut",
            fieldType: "select",
            options: clientes.map((cliente) => ({
              value: cliente.id,
              label: `${cliente.nombreCompleto} (${cliente.rut})`,
            })),
            required: true,
            onChange: (e) => handleInputChange("clienteRut", e.target.value),
          },
          {
            label: "Bicicleta",
            name: "id_Bicicleta",
            fieldType: "select",
            options: bicicletaOptions,
            required: true,
            onChange: (e) => handleInputChange("id_Bicicleta", e.target.value),
          },
          {
            label: "Motivo de reparación",
            name: "motivoReparacion",
            fieldType: "textarea",
            placeholder: "Escribe el motivo de la reparación...",
            required: true,
            onChange: (e) => handleInputChange("motivoReparacion", e.target.value),
          },
        ]}
        buttonText="Registrar Pedido"
        onSubmit={handleSubmit}
        footerContent={
          <p>
            ¿Ya tienes pedidos registrados?, <Link to="/pedidoReparacion/all">¡Ver pedidos!</Link>
          </p>
        }
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
};

export default PedidoReparacion;

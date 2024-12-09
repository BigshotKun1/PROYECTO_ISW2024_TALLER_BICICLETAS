/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPedidoReparacion } from "@services/PedidoReparacion.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { getClientes } from "@services/cliente.service.js"; // Servicio para obtener los clientes
import { getBicicletasPorCliente } from "@services/bicicleta.service.js"; // Servicio para obtener las bicicletas por cliente
import Form from "@components/Form";
import { Link } from "react-router-dom";

const PedidoReparacion = ({ rut }) => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [bicicletas, setBicicletas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPedido, setNewPedido] = useState({
    clienteId: "",
    id_Bicicletas: "",
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
            clienteId: clientesResponse[0].id, // Asignamos un cliente por defecto
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
    if (newPedido.clienteId) {
      const loadBicicletas = async () => {
        try {
          const bicicletasResponse = await getBicicletasPorCliente(newPedido.clienteId); 
          console.log("Bicicletas recibidas:", bicicletasResponse);
          setBicicletas(bicicletasResponse);
        } catch (err) {
          console.error("Error al cargar las bicicletas:", err);
        }
      };
      loadBicicletas();
    }
  }, [newPedido.clienteId]); // Se ejecuta cada vez que cambia clienteId

  // Crear opciones de bicicletas para el select
  const bicicletaOptions = bicicletas.map((bicicleta) => ({
    value: bicicleta.id,
    label: `${bicicleta.marca} ${bicicleta.modelo}`,
}));

  useEffect(() => {
    const fetchBicicletas = async () => {
        try {
            const data = await getBicicletasPorCliente(rut);
            if (Array.isArray(data)) {
                setBicicletas(data);
            } else {
                throw new Error("Datos de bicicletas no son un array");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchBicicletas();
}, [rut]);

  const handleInputChange = (name, value) => {
    setNewPedido((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validación básica
    if (!newPedido.clienteId || !newPedido.id_Bicicletas || !newPedido.motivoReparacion) {
      setError("Todos los campos son obligatorios.");
      return;
    }

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
            name: "clienteId",
            fieldType: "select",
            options: clientes.map((cliente) => ({
              value: cliente.id,
              label: `${cliente.nombreCompleto} (${cliente.rut})`,
            })),
            required: true,
            onChange: (e) => handleInputChange("clienteId", e.target.value),
          },
          {
            label: "Bicicleta",
            name: "id_Bicicletas",
            fieldType: "select",
            options: bicicletaOptions,
            required: true,
            onChange: (e) => handleInputChange("id_Bicicletas", e.target.value),
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
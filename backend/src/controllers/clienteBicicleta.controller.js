import { obtenerClientesConBicicletasService } from "../services/clienteBicicleta.service.js";

export const obtenerClientesConBicicletasController = async (req, res) => {
  try {
    const clientesConBicicletas = await obtenerClientesConBicicletasService();

    res.status(200).json({
      status: "Success",
      message: "Lista de clientes con sus bicicletas",
      data: clientesConBicicletas,
    });
  } catch (error) {
    console.error("Error en obtenerClientesConBicicletasController:", error);
    res.status(500).json({
      status: "Error",
      message: error.message || "Ocurrió un error al procesar la solicitud.",
    });
  }
};

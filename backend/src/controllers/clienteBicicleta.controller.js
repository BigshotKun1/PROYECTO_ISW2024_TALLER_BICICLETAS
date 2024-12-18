import { obtenerClientesConBicicletasService } from "../services/clienteBicicleta.service.js";
import { crearClienteYBicicletaService } from "../services/clienteBicicleta.service.js";
import Cliente from "../entity/cliente.entity.js";
import Bicicleta from "../entity/bicicleta.entity.js";
import { AppDataSource } from "../config/configDb.js";


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

export const obtenerClientesSinBicicleta = async (req, res) => {
  try {
    const clienteRepository = AppDataSource.getRepository(Cliente);

    // Usamos leftJoinAndSelect para obtener clientes con bicicletas relacionadas
    const clientes = await clienteRepository
      .createQueryBuilder("cliente")
      .leftJoinAndSelect("cliente.bicicletas", "bicicleta") // Join con la relación bicicletas
      .where("bicicleta.id_Bicicleta IS NULL") // Filtrar clientes que no tienen bicicletas (bicicleta.id_Bicicleta es NULL)
      .getMany();

    return res.json({
      status: "Success",
      clientes: clientes,
    });
  } catch (error) {
    console.error("Error al obtener clientes sin bicicletas", error);
    return res.status(500).json({
      status: "Error",
      message: "Hubo un error al obtener los clientes sin bicicletas.",
    });
  }
};


export const crearClienteYBicicleta = async (req, res) => {
  const { rut, nombreCompleto, telefono, bicicleta } = req.body;

  // Verificar que se han enviado todos los campos necesarios
  if (!rut || !nombreCompleto || !telefono || !bicicleta) {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }

  try {
    // Llamamos al servicio que crea el cliente y la bicicleta
    const result = await crearClienteYBicicletaService({
      cliente: { rut, nombreCompleto, telefono },
      bicicleta,
    });

    // Enviar respuesta con éxito
    return res.status(201).json({
      message: "Cliente y bicicleta creados exitosamente",
      data: result,
    });
  } catch (error) {
    // Manejar errores de validación
    if (error.statusCode === 400) {
      return res.status(400).json({ message: error.message });
    }

    // Manejar errores internos
    console.error("Error interno:", error); // Para depuración
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};




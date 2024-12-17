import * as bicicletaService from "../services/bicicleta.service.js";
import { handleErrorClient, handleErrorServer, handleSuccess, } from "../handlers/responseHandlers.js";

// Crear una nueva bicicleta
export const crearBicicletaController = async (req, res) => {
    try {
        const nuevaBicicleta = await bicicletaService.crearBicicleta(req.body);
        handleSuccess(res, 201, "Bicicleta creada exitosamente", nuevaBicicleta);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
};

// Crear una nueva bicicleta y asociarla a un cliente
export const crearBicicleta = async (req, res) => {
    const { rut } = req.params;  // RUT del cliente
    const { marca, modelo, color } = req.body;  // Datos de la bicicleta
  
    try {
      // Llamar al servicio de bicicletas para crearla
      const [bicicleta, errorBicicleta] = await bicicletaService.crearBicicleta({ rut, marca, modelo, color });
  
      if (errorBicicleta) {
        return handleErrorClient(res, 400, errorBicicleta);
      }
  
      // Respuesta exitosa
      return handleSuccess(res, 201, "Bicicleta creada y asociada al cliente exitosamente", bicicleta);
    } catch (err) {
      return handleErrorServer(res, 500, err.message);
    }
  };

// Obtener todas las bicicletas
export const obtenerBicicletasController = async (req, res) => {
    try {
        const bicicletas = await bicicletaService.obtenerBicicletas();
        handleSuccess(res, 200, "Lista de bicicletas", bicicletas);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
};

// Obtener bicicletas de un cliente específico
export const obtenerBicicletasPorClienteController = async (req, res) => {
    try {
        const { rut } = req.params;
        const bicicletas = await bicicletaService.obtenerBicicletasPorCliente(rut);
        handleSuccess(res, 200, `Bicicletas del cliente con rut: ${rut}`, bicicletas);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
};

// Eliminar una bicicleta por ID
export const eliminarBicicletaController = async (req, res) => {
    try {
        const { id_Bicicleta } = req.params;
        const bicicletaEliminada = await bicicletaService.eliminarBicicleta(id_Bicicleta);
        if (!bicicletaEliminada) return handleErrorClient(res, 404, "Bicicleta no encontrada");
        handleSuccess(res, 200, "Bicicleta eliminada exitosamente", bicicletaEliminada);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
};
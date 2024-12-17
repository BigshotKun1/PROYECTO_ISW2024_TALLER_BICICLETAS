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

export const crearBicicleta = async (req, res) => {
    const { rut } = req.params;  // RUT del cliente
    const { bicicleta } = req.body;  // Datos de la bicicleta anidados

    // Extraer datos del objeto bicicleta
    const { marca, modelo, color } = bicicleta || {};

    console.log('Datos recibidos:', { marca, modelo, color });

    // Verificar si faltan campos
    if (!marca || !modelo || !color) {
        return handleErrorClient(res, 400, "Todos los campos (marca, modelo, color) son requeridos");
    }

    try {
        console.log("Buscando cliente...");
        const [bicicleta, errorBicicleta] = await bicicletaService.crearBicicleta({ rut, marca, modelo, color });
        console.log("Cliente encontrado, creando bicicleta...");

        if (errorBicicleta) {
            return handleErrorClient(res, 400, errorBicicleta);
        }

        return handleSuccess(res, 201, "Bicicleta creada y asociada al cliente exitosamente", bicicleta);
    } catch (err) {
        console.error("Error al crear bicicleta:", err);
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
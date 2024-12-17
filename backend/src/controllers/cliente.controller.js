"use strict";
import {
    createClienteService,
    deleteClienteService,
    getClienteService,
    getClientesService,
    updateClienteService,
} from "../services/cliente.service.js";
import {
    clienteBodyValidation,
    clienteQueryValidation,
} from "../validations/cliente.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";
import { crearClienteYBicicletaService } from "../services/clienteBicicleta.service.js";


// Crear un nuevo cliente
export const createCliente = async (req, res) => {
  const { rut, nombreCompleto, telefono } = req.body;
  console.log(req.body);
const { error } = clienteBodyValidation.validate(req.body);
  if (error) {
    return handleErrorClient(res, 400, error.details[0].message);
  }
  
  try {
    const [cliente, errorCliente] = await createClienteService({ rut, nombreCompleto, telefono });

    if (errorCliente) return handleErrorClient(res, 400, errorCliente);

    return handleSuccess(res, 201, "Cliente creado exitosamente", cliente);
  } catch (err) {
    return handleErrorServer(res, 500, err.message);
  }
};

/*
export const crearClienteYBicicleta = async (req, res) => {
  const { rut, nombreCompleto, telefono, bicicleta } = req.body;
   // Asegúrate de que estos datos están en el cuerpo de la solicitud

  try {
      const { cliente, bicicleta: nuevaBicicleta } = await crearClienteYBicicletaService(
        { rut, nombreCompleto, telefono, bicicleta });
      handleSuccess(res, 201, "Cliente y bicicleta creados exitosamente", { cliente, bicicleta: nuevaBicicleta });
  } catch (error) {
      handleErrorServer(res, 500, error.message);
  }
};
*/
/*
// Crear un nuevo cliente
export const createCliente = async (req, res) => {
  const { rut, nombreCompleto, telefono } = req.body;

  // Validación de los datos del cliente
  const { error } = clienteBodyValidation.validate(req.body);
  if (error) {
    return handleErrorClient(res, 400, error.details[0].message);
  }

  try {
    // Opcional: Verificar si el cliente ya existe antes de intentar crearlo
    const existingCliente = await getClienteByRutService(rut);
    if (existingCliente) {
      return handleErrorClient(res, 400, "El cliente ya existe con el RUT proporcionado.");
    }

    // Crear el cliente
    const [cliente, errorCliente] = await createClienteService({ rut, nombreCompleto, telefono });
    if (errorCliente) return handleErrorClient(res, 400, errorCliente);

    // Respuesta exitosa
    return handleSuccess(res, 201, "Cliente creado exitosamente", cliente);
  } catch (err) {
    // Manejo de errores del servidor
    return handleErrorServer(res, 500, err.message);
  }
};*/

// Obtener todos los clientes
export const getClientes = async (req, res) => {
    try {
        const [clientes, errorClientes] = await getClientesService();
    
        if (errorClientes) return handleErrorClient(res, 404, errorClientes);
    
        clientes.length === 0
        ? handleSuccess(res, 204)
        : handleSuccess(res, 200, "Clientes encontrados", clientes);
        } catch (error) {
        handleErrorServer(
        res,
        500,
        error.message,
        );
    }
};

// Obtener un cliente por ID
export const getCliente = async (req, res) => {
    try {
        const { rut } = req.params;
    
        const { error } = clienteQueryValidation.validate({ rut });
    
        if (error) return handleErrorClient(res, 400, error.message);
    
        const [user, errorUser] = await getClienteService({ rut });
    
        if (errorUser) return handleErrorClient(res, 404, errorUser);
    
        handleSuccess(res, 200, "Cliente encontrado", user);
        } catch (error) {
        handleErrorServer(res, 500, error.message);
        }
};

// Actualizar un cliente por ID
export const updateCliente = async (req, res) => {
  // Código para actualizar un cliente
};
// Eliminar un cliente por ID
export const deleteCliente = async (req, res) => {
  // Código para eliminar un cliente
};

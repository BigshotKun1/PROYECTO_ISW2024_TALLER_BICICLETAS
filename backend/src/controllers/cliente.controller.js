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


// Crear un nuevo cliente
export const createCliente = async (req, res) => {
  const { rut, nombreCompleto, telefono } = req.body;

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
        const { rut, telefono } = req.query;
    
        const { error } = userQueryValidation.validate({ rut, telefono });
    
        if (error) return handleErrorClient(res, 400, error.message);
    
        const [user, errorUser] = await getUserService({ rut, telefono });
    
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

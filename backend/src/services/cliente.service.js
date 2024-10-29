"use strict";
import Cliente from "../entity/cliente.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createClienteService(body) {
    try {
        const clienteRepository = AppDataSource.getRepository(Cliente);

        const existingCliente = await clienteRepository.findOne({
            where: [{ rut: body.rut }],
        });

        if (existingCliente) return [null, "Ya existe un cliente con el mismo rut"];

        const newCliente = clienteRepository.create({
            rut: body.rut,
            nombreCompleto: body.nombreCompleto,
            telefono: body.telefono,
            bicicleta: body.bicicleta,
        });

        const clienteCreated = await clienteRepository.save(newCliente);

        return [clienteCreated, null];
    } catch (error) {
        console.error("Error al crear un cliente:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getClienteService(query) {
  try {
    const { rut, id, email } = query;

    const clienteRepository = AppDataSource.getRepository(Cliente);

    const clienteFound = await clienteRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }],
    });

    if (!clienteFound) return [null, "Cliente no encontrado"];

    return [clienteFound, null];
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getClientesService() {
  try {
    const clienteRepository = AppDataSource.getRepository(Cliente);

    const clientes = await clienteRepository.find();

    if (!clientes || clientes.length === 0) return [null, "No hay clientes"];

    return [clientes, null];
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateClienteService(query, body) {
  try {
    const { id, rut, email } = query;

    const clienteRepository = AppDataSource.getRepository(Cliente);

    const clienteFound = await clienteRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }],
    });

    if (!clienteFound) return [null, "Cliente no encontrado"];

    const existingCliente = await clienteRepository.findOne({
      where: [{ rut: body.rut }, { email: body.email }],
    });

    if (existingCliente && existingCliente.id !== clienteFound.id) {
      return [null, "Ya existe un cliente con el mismo rut o email"];
    }

    const dataClienteUpdate = {
      nombreCompleto: body.nombreCompleto,
      rut: body.rut,
      email: body.email,
      updatedAt: new Date(),
    };

    await clienteRepository.update({ id: clienteFound.id }, dataClienteUpdate);

    const clienteData = await clienteRepository.findOne({
      where: { id: clienteFound.id },
    });

    if (!clienteData) {
      return [null, "Cliente no encontrado después de actualizar"];
    }

    return [clienteData, null];
  } catch (error) {
    console.error("Error al modificar un cliente:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteClienteService(query) {
  try {
    const { id, rut, email } = query;

    const clienteRepository = AppDataSource.getRepository(Cliente);

    const clienteFound = await clienteRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }],
    });

    if (!clienteFound) return [null, "Cliente no encontrado"];

    const clienteDeleted = await clienteRepository.remove(clienteFound);

    return [clienteDeleted, null];
  } catch (error) {
    console.error("Error al eliminar un cliente:", error);
    return [null, "Error interno del servidor"];
  }
}

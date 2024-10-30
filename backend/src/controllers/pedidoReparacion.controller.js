"use strict";
import { AppDataSource } from "../config/configDb.js";
import PedidoReparacion from "../entity/pedidosReparacion.entity.js";
import Cliente from "../entity/cliente.entity.js";
import Bicicleta from "../entity/bicicleta.entity.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

// Crear un nuevo pedido de reparación
export const crearPedidoReparacion = async (req, res) => {
  const { clienteRut, motivoReparacion, id_Bicicleta } = req.body;

  // Validación de campos
  if (!clienteRut || !motivoReparacion || !id_Bicicleta) {
      return handleErrorClient(res, 400, "Todos los campos son obligatorios");
  }

  try {
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
      const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);

      // Verificar si el cliente existe
      const cliente = await clienteRepository.findOneBy({ rut: clienteRut });
      if (!cliente) {
          return handleErrorClient(res, 404, "Cliente no encontrado");
      }

      // Verificar si la bicicleta existe
      const bicicleta = await bicicletaRepository.findOneBy({ id_Bicicleta });
      if (!bicicleta) {
          return handleErrorClient(res, 404, "Bicicleta no encontrada");
      }

      // Crear y guardar el pedido de reparación
      const pedidoReparacion = pedidoReparacionRepository.create({
          cliente,  // Asignar el objeto cliente completo
          motivoReparacion,
          bicicleta, // Asignar el objeto bicicleta completo
      });

      await pedidoReparacionRepository.save(pedidoReparacion);
      return handleSuccess(res, 201, "Pedido de reparación creado exitosamente", pedidoReparacion);
  } catch (error) {
      console.error(error);
      return handleErrorServer(res, 500, "Error al crear el pedido de reparación");
  }
};


// Obtener todos los pedidos de reparación
export const obtenerPedidosReparacion = async (req, res) => {
  try {
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);
    const pedidos = await pedidoReparacionRepository.find();
    return handleSuccess(res, 200, "Pedidos de reparación obtenidos exitosamente", pedidos);
  } catch (error) {
    console.error(error);
    return handleErrorServer(res, 500, "Error al obtener los pedidos de reparación");
  }
};

// Obtener un pedido de reparación por ID
export const obtenerPedidoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);
    const pedido = await pedidoReparacionRepository.findOneBy({ id });
    if (!pedido) {
      return handleErrorClient(res, 404, "Pedido de reparación no encontrado");
    }
    return handleSuccess(res, 200, "Pedido de reparación obtenido exitosamente", pedido);
  } catch (error) {
    console.error(error);
    return handleErrorServer(res, 500, "Error al obtener el pedido de reparación");
  }
};

export const actualizarPedidoReparacion = async (req, res) => {
  const { id } = req.params;
  const { descripcionReparacion, piezasUtilizadas, estado } = req.body;

  if (!descripcionReparacion || !estado) {
      return handleErrorClient(res, 400, "Descripción y estado son obligatorios");
  }

  try {
      const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);
      const pedido = await pedidoReparacionRepository.findOneBy({ id });

      if (!pedido) {
          return handleErrorClient(res, 404, "Pedido de reparación no encontrado");
      }

      pedido.descripcionReparacion = descripcionReparacion;
      pedido.piezasUtilizadas = piezasUtilizadas;
      pedido.estado = estado;

      await pedidoReparacionRepository.save(pedido);
      return handleSuccess(res, 200, "Pedido de reparación actualizado exitosamente", pedido);
  } catch (error) {
      console.error(error);
      handleErrorServer(res, 500, "Error al actualizar el pedido de reparación");
  }
};

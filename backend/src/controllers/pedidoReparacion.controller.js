"use strict";
import { In } from "typeorm";
import { AppDataSource } from "../config/configDb.js";
import PedidoReparacion from "../entity/pedidosReparacion.entity.js";
import Cliente from "../entity/cliente.entity.js";
import Bicicleta from "../entity/bicicleta.entity.js";
import EstadoReparacion from "../entity/estado_reparacion.js";

import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

export const crearPedidoReparacion = async (req, res) => {
  try {
    // Desestructurar los valores enviados en la solicitud
    const { clienteRut, id_Bicicleta, motivoReparacion } = req.body;

    // Validar que todos los campos obligatorios estén presentes
    if (!clienteRut || !id_Bicicleta || !motivoReparacion) {
      return res.status(400).json({ message: 'Faltan datos requeridos: clienteRut, id_Bicicleta, motivoReparacion' });
    }

    // Obtener los repositorios
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);
    const estadoReparacionRepository = AppDataSource.getRepository(EstadoReparacion);

    // Verificar si el cliente existe
    const cliente = await clienteRepository.findOneBy({ rut: clienteRut });
    if (!cliente) {
      return handleErrorClient(res, 404, "Cliente no encontrado");
    }

    // Verificar si la bicicleta existe
    const bicicleta = await bicicletaRepository.findOneBy({ id_Bicicleta: id_Bicicleta });
    if (!bicicleta) {
      return handleErrorClient(res, 404, "Bicicleta no encontrada");
    }

    // Verificar si el estado "En reparación" existe en la base de datos
    const estadoReparacion = await estadoReparacionRepository.findOne({ where: { estados_r: "En reparacion" } });
    if (!estadoReparacion) {
      return res.status(400).json({ message: "El estado 'En reparacion' no existe en la base de datos" });
    }

    // Crear un nuevo pedido de reparación
    const nuevoPedido = pedidoReparacionRepository.create({
      motivoReparacion, // Motivo de reparación
      cliente,          // Cliente
      bicicleta,        // Bicicleta
      estadoReparacion //e  // Estado de reparación
    });

    // Guardar el pedido en la base de datos
    await pedidoReparacionRepository.save(nuevoPedido);

    // Responder con el pedido creado
    return handleSuccess(res, 201, 'Pedido de reparación creado', nuevoPedido);
  } catch (error) {
    console.error('Error al crear el pedido de reparación:', error);
    return handleErrorServer(res, 500, 'Error al crear el pedido de reparación');
  }
};

// Obtener todos los pedidos de reparación
export const obtenerPedidosReparacion = async (req, res) => {
  try {
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);
    const pedidos = await pedidoReparacionRepository.find({ relations: ["cliente", "bicicleta", "estadoReparacion"] });

    return handleSuccess(res, 200, "Pedidos de reparación obtenidos exitosamente", pedidos);
  } catch (error) {
    console.error(error);
    return handleErrorServer(res, 500, "Error al obtener los pedidos de reparación");
  }
};

// Obtener un pedido de reparación por ID
export const obtenerPedidoPorRUT = async (req, res) => {
  const { rut } = req.params;

  try {
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);
    const pedido = await pedidoReparacionRepository.find({ where: { cliente: { rut } },
          relations: ["cliente", "bicicleta", "estadoReparacion"] });

    if (pedido.length === 0) {
      return handleErrorClient(res, 404, 
      "No se encontraron pedidos de reparación para el cliente con el RUT proporcionado");
    }
    return handleSuccess(res, 200, "Pedido de reparación obtenido exitosamente", pedido);
  } catch (error) {
    console.error(error);
    return handleErrorServer(res, 500, "Error al obtener el pedido de reparación");
  }
};

// Obtener el reporte de reparaciones
export const obtenerReporteReparaciones = async (req, res) => {
  const { fechaInicio, fechaFin, tipoReparacion, mecanico, estado, clienteRut } = req.query;
  try {
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);

    // Construir las condiciones de busqueda basada en filtros
    const conditions = {};
    if (fechaInicio && fechaFin) {
      conditions.fechaReparacion = Between(new Date(fechaInicio), new Date(fechaFin));
    }
    if (tipoReparacion) {
      conditions.tipoReparacion = tipoReparacion;
    }
    if (mecanico) {
      conditions.mecanico = mecanico;
    }
    if (estado) {
      conditions.estado = estado;
    }
    if (clienteRut) {
      conditions.clienteRut = clienteRut;
    }

    const reporte = await pedidoReparacionRepository.find({ where: conditions });
    return handleSuccess(res, 200, "Reporte de reparaciones obtenido exitosamente", reporte);
  } catch (error) {
    return handleErrorServer(res, 500, "Error al obtener el reporte de reparaciones");
  }
};

// Exportar el reporte de reparaciones a PDF o Excel
export const exportarHistorialReparaciones = async (req, res) => {
  const { clienteRut, formato } = req.query;
  try{
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);
    const historial = await pedidoReparacionRepository.find({ where: { clienteRut } });

    if (formato === "pdf"){
      const doc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=historial_reparaciones_${clienteRut}.pdf`);

      doc.text("Historial de reparaciones");
      historial.forEach((reparacion, index) => {
        doc.text(`Reparación ${index + 1}`);
        doc.text(`Fecha de reparación: ${reparacion.fechaReparacion}`);
        doc.text(`Detalles: ${reparacion.detalles}`);
        doc.text(`Mecánico: ${reparacion.mecanico}`);
        doc.text(`Estado: ${reparacion.estado}`);
        doc.text(`Costo: ${reparacion.costo}`);
        doc.text(`Tipo de reparación: ${reparacion.tipoReparacion}`);
        doc.moveDown();
      });

      doc.pipe(res);
      doc.end();
    } else if (formato === "excel") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Historial de reparaciones");
      worksheet.columns = [
        { header: "Fecha de reparación", key: "fechaReparacion", width: 15 },
        { header: "Detalles", key: "detalles", width: 30 },
        { header: "Mecánico", key: "mecanico", width: 20 },
        { header: "Estado", key: "estado", width: 15 },
        { header: "Costo", key: "costo", width: 10 },
        { header: "Tipo de reparación", key: "tipoReparacion", width: 20 }
      ];

      historial.forEach(reparacion => {
        worksheet.addRow(reparacion);
      });

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename=historial_reparaciones_${clienteRut}.xlsx`);
      
      await workbook.xlsx.write(res);
    }
  } catch (error) {
    return handleErrorServer(res, 500, "Error al exportar el reporte de reparaciones");
  }
}

export const actualizarPedidoReparacion = async (req, res) => {
  const { id_PedidoReparacion } = req.params;
  const { descripcionReparacion, idE_R } = req.body;

  try {
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);
    const pedido = await pedidoReparacionRepository.findOne({
      where: { id_PedidoReparacion },
      relations: ["estadoReparacion"],
    });

    if (!pedido) {
      return handleErrorClient(res, 404, "Pedido de reparación no encontrado");
    }

    // Actualizar solo los campos necesarios
    if (descripcionReparacion) pedido.descripcionReparacion = descripcionReparacion;

    // Actualizar el estado de reparación si está presente
    if (idE_R) {
      const estadoReparacionRepository = AppDataSource.getRepository("EstadoReparacion");
      const estadoReparacion = await estadoReparacionRepository.findOne({ where: { idE_R } });
      if (!estadoReparacion) {
        return handleErrorClient(res, 404, "Estado de reparación no encontrado");
      }
      pedido.estadoReparacion = estadoReparacion;
    }

    // Actualizar la fecha de actualización
    pedido.updatedAt = new Date();

    await pedidoReparacionRepository.save(pedido);

    return handleSuccess(res, 200, "Pedido de reparación actualizado exitosamente", pedido);
  } catch (error) {
    return handleErrorServer(res, 500, "Error al actualizar el pedido de reparación", error);
  }
};

const getEstadosReparacion = async (req, res) => {
  try {
    // Obtener todos los estados únicos de reparación de los pedidos
    const repository = AppDataSource.getRepository(PedidoReparacion);
    const estados = await repository
      .createQueryBuilder("pedido")
      .leftJoinAndSelect("pedido.estadoReparacion", "estado")
      .select("estado.estados_r")
      .distinct(true) // Para obtener valores únicos
      .getRawMany();

    // Extraer solo los estados de la respuesta
    const estadosUnicos = estados.map(estado => estado.estados_r);

    return res.json(estadosUnicos);
  } catch (error) {
    console.error("Error al obtener los estados:", error);
    return res.status(500).json({ message: "Error al obtener los estados de reparación" });
  }
};
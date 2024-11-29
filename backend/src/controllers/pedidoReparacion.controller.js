"use strict";
import { In } from "typeorm";
import { AppDataSource } from "../config/configDb.js";
import PedidoReparacion from "../entity/pedidosReparacion.entity.js";
import Cliente from "../entity/cliente.entity.js";
import Bicicleta from "../entity/bicicleta.entity.js";
import EstadoReparacion from "../entity/estado_reparacion.entity.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

// Crear un nuevo pedido de reparación
export const crearPedidoReparacion = async (req, res) => {
  const { clienteRut, motivoReparacion, descripcionReparacion, id_Bicicleta, idE_R } = req.body;

  // Validación de campos
  if (!clienteRut || !motivoReparacion || !descripcionReparacion || !id_Bicicleta || !idE_R) {
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
          cliente,
          motivoReparacion,
          descripcionReparacion,
          bicicleta,
          estadoReparacion: idE_R,
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
  const { motivoReparacion, descripcionReparacion, clienteRut, id_Bicicleta, idE_R } = req.body;

  try {
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);
    const pedido = await pedidoReparacionRepository.findOne({
      where: { id_PedidoReparacion },
      relations: ["estadoReparacion", "cliente", "bicicleta"],
    });

    if (!pedido) {
      return handleErrorClient(res, 404, "Pedido de reparación no encontrado");
    }

    // Actualizar los campos del pedido de reparación solo si están presentes en la solicitud
    if (motivoReparacion) pedido.motivoReparacion = motivoReparacion;
    if (descripcionReparacion) pedido.descripcionReparacion = descripcionReparacion;

    // Actualizar la relación con Cliente si está presente en la solicitud
    if (clienteRut) {
      const clienteRepository = AppDataSource.getRepository("Cliente");
      const cliente = await clienteRepository.findOne({ where: { rut: clienteRut } });
      if (!cliente) {
        return handleErrorClient(res, 404, "Cliente no encontrado");
      }
      pedido.cliente = cliente;
    }

    // Actualizar la relación con Bicicleta si está presente en la solicitud
    if (id_Bicicleta) {
      const bicicletaRepository = AppDataSource.getRepository("Bicicleta");
      const bicicleta = await bicicletaRepository.findOne({ where: { id_Bicicleta } });
      if (!bicicleta) {
        return handleErrorClient(res, 404, "Bicicleta no encontrada");
      }
      pedido.bicicleta = bicicleta;
    }

    // Actualizar la relación con EstadoReparacion si está presente en la solicitud
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
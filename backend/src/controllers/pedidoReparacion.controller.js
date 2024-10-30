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
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

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

// Obtener el historial de reparaciones de un cliente
export const obtenerHistorialReparaciones = async (req, res) => {
  const { clienteRut } = req.query;

  try {
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);
    const historial = await pedidoReparacionRepository.find({ where: { clienteRut } });

    if (historial.length === 0) {
      return res.status(404).json({ message: "No se encontraron reparaciones para el cliente especificado" });
    }

    return res.status(200).json({ success: true, data: historial });
  } catch (error) {
    console.error("Error al obtener el historial de reparaciones", error);
    return res.status(500).json({ success: false, message: "Error al obtener el historial de reparaciones" });
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
"use strict";
import { AppDataSource } from "../config/configDb.js";
import PedidoReparacion from "../entity/pedidosReparacion.entity.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

// Obtener estadísticas del taller
export const obtenerEstadisticasTaller = async (req, res) => {
    try {
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);

    // Total de reparaciones
    const totalReparaciones = await pedidoReparacionRepository.count();

    // Total de reparaciones pendientes
    const totalPendientes = await pedidoReparacionRepository.count({
        where: [
        { estadoReparacion: { estados_r: "En reparacion" } },
        { estadoReparacion: { estados_r: "En espera por falta de repuestos" } }
        ]
    });

    // Total de reparaciones completadas
    const totalCompletadas = await pedidoReparacionRepository.count({
        where: { estadoReparacion: { estados_r: "Finalizado" } }
    });

    // Tiempo promedio de reparación
    const reparacionesCompletadas = await pedidoReparacionRepository.find({
        where: { estadoReparacion: { estados_r: "Finalizado" } }
    });
    
    const tiempoTotal = reparacionesCompletadas.reduce((total, reparacion) => {
        const tiempoReparacion = 
        (new Date(reparacion.updatedAt) - new Date(reparacion.createdAt)) / (1000 * 60 * 60); // en horas
        return total + tiempoReparacion;
    }, 0);
    const tiempoPromedio = reparacionesCompletadas.length ? tiempoTotal / reparacionesCompletadas.length : 0;

    const estadisticas = {
        totalReparaciones,
        totalPendientes,
        totalCompletadas,
        tiempoPromedio,
    };

    return handleSuccess(res, 200, "Estadísticas del taller obtenidas exitosamente", estadisticas);
    } catch (error) {
    console.error("Error al obtener las estadísticas del taller:", error);
    return handleErrorServer(res, 500, `Error al obtener las estadísticas del taller: ${error.message}`);
    }
};
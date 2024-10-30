// backend/src/controllers/estadisticas.controller.js
import { AppDataSource } from "../data-source";
import { PedidoReparacion } from "../entities/PedidoReparacion";

export const obtenerEstadisticas = async (req, res) => {
try {
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);

    const totalReparaciones = await pedidoReparacionRepository.count();
    const reparacionesPendientes = await pedidoReparacionRepository.count({ where: { estado: "pendiente" } });
    const reparacionesCompletadas = await pedidoReparacionRepository.count({ where: { estado: "completada" } });
    const piezasMasUtilizadas = await pedidoReparacionRepository.query
    (` 
        SELECT pieza, COUNT(*) as uso
        FROM PedidoReparacion
        GROUP BY pieza
        ORDER BY uso DESC
        LIMIT 5 
    `);
    const tiempoPromedioReparacion = await pedidoReparacionRepository.query(`
        SELECT AVG(DATEDIFF(fechaFin, fechaInicio)) as tiempoPromedio
        FROM PedidoReparacion
        WHERE estado = 'completada'
    `);

    const estadisticas = {
        totalReparaciones,
        reparacionesPendientes,
        reparacionesCompletadas,
        piezasMasUtilizadas,
        tiempoPromedioReparacion: tiempoPromedioReparacion[0].tiempoPromedio,
    };

    return res.status(200).json({ success: true, data: estadisticas });
    } catch (error) {
    return res.status(500).json({ success: false, message: "Error al obtener las estadísticas" });
    }
};
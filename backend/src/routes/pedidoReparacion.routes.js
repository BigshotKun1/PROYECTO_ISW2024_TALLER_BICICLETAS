"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrSeller } from "../middlewares/authorization.middleware.js";
import { 
    crearPedidoReparacion,
    exportarHistorialReparaciones,
    obtenerHistorialReparaciones, 
    obtenerPedidoPorId, 
    obtenerPedidosReparacion,
    obtenerReporteReparaciones
} from "../controllers/pedidoReparacion.controller.js";

const router = Router();

// Middleware para verificar si el usuario es administrador o vendedor
router
.use(authenticateJwt)
.use(isAdminOrSeller);

// Rutas para gestionar pedidos de reparación
router
    .post("/", crearPedidoReparacion)
    .get("/", obtenerPedidosReparacion)
    .get("/:id", obtenerPedidoPorId);

// Ruta para obtener el historial de reparaciones
router.get("/historial", obtenerHistorialReparaciones);

// Ruta para obtener el reporte de reparaciones
router.get("/reporte", obtenerReporteReparaciones);

// Ruta para exportar el historial de reparaciones
router.get("/exportar-historial", exportarHistorialReparaciones);

// Obtener un pedido de reparación por ID
export default router;
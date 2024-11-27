"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrSeller } from "../middlewares/authorization.middleware.js";
import { isMecanic } from "../middlewares/authorization.middleware.js";
import {
    actualizarPedidoReparacion,
    crearPedidoReparacion,
    exportarHistorialReparaciones, 
    obtenerPedidoPorId, 
    obtenerPedidosReparacion,
    obtenerReporteReparaciones
} from "../controllers/pedidoReparacion.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isMecanic);
    

// Rutas para gestionar pedidos de reparación
router
    .post("/", crearPedidoReparacion) //* http://localhost:3000/api/pedidoReparacion - post
    .get("/", obtenerPedidosReparacion) //* http://localhost:3000/api/pedidoReparacion - get
    .get("/:id_PedidoReparacion", obtenerPedidoPorId) //* http://localhost:3000/api/pedidoReparacion/:id - get
    .put("/:id_PedidoReparacion", actualizarPedidoReparacion) //* http://localhost:3000/api/pedidoReparacion/:id - put

// Ruta para obtener el reporte de reparaciones
router.get("/reporte", obtenerReporteReparaciones); // en proceso

// Ruta para exportar el historial de reparaciones
router.get("/exportar-historial", exportarHistorialReparaciones); // en proceso

export default router;
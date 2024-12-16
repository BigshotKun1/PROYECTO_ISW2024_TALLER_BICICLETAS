"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrSeller, isMecanic } from "../middlewares/authorization.middleware.js";
import {
    actualizarPedidoReparacion,
    crearPedidoReparacion,
    exportarHistorialReparaciones, 
    obtenerPedidoPorRUT, 
    obtenerPedidosReparacion,
    obtenerReporteReparaciones
} from "../controllers/pedidoReparacion.controller.js";

const router = Router();

router
    .use(authenticateJwt)

// Rutas para gestionar pedidos de reparación
router
    .post("/", isAdminOrSeller, crearPedidoReparacion) //* http://localhost:3000/api/pedidoReparacion - post
    .get("/all", isMecanic, obtenerPedidosReparacion) 
    //* http://localhost:3000/api/pedidoReparacion/all - get
    .get("/:rut", obtenerPedidoPorRUT) //* http://localhost:3000/api/pedidoReparacion/:rut - get
    .patch("/:id_PedidoReparacion", actualizarPedidoReparacion) //* http://localhost:3000/api/pedidoReparacion/:id

// Ruta para obtener el reporte de reparaciones
router.get("/reporte", obtenerReporteReparaciones); // en proceso

// Ruta para exportar el historial de reparaciones
router.get("/exportar-historial", exportarHistorialReparaciones); // en proceso

export default router;
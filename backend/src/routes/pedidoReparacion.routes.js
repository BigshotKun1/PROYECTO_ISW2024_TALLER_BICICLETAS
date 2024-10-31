"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrSeller } from "../middlewares/authorization.middleware.js";
import { isMecanic } from "../middlewares/authorization.middleware.js";
import { actualizarPedidoReparacion } from "../controllers/pedidoReparacion.controller.js";
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
<<<<<<< Updated upstream
    .post("/", crearPedidoReparacion)
    .get("/", obtenerPedidosReparacion)
    .get("/:id", obtenerPedidoPorId)
    .patch("/:id", isMecanic, actualizarPedidoReparacion);
=======
    .post("/", crearPedidoReparacion)   //* http://localhost:3000/api/pedidos-reparacion - post
    .get("/", obtenerPedidosReparacion) //* http://localhost:3000/api/pedidos-reparacion - get
    .get("/:id", obtenerPedidoPorId)    //* http://localhost:3000/api/pedidos-reparacion/:id - get
    .patch("/:id", isMecanic, actualizarPedidoReparacion) //* http://localhost:3000/api/pedidos-reparacion/:id - patch
    .patch("/:id", isMecanic, actualizarEstadoPedido);  //* http://localhost:3000/api/pedidos-reparacion/:id - patch
>>>>>>> Stashed changes
// Obtener todos los pedidos de reparación

// Ruta para obtener el historial de reparaciones
router.get("/historial", obtenerHistorialReparaciones); //* http://localhost:3000/api/pedidos-reparacion/historial

// Ruta para obtener el reporte de reparaciones
router.get("/reporte", obtenerReporteReparaciones);  //* http://localhost:3000/api/pedidos-reparacion/reporte

// Ruta para exportar el historial de reparaciones
router.get("/exportar-historial", exportarHistorialReparaciones); 
//* http://localhost:3000/api/pedidos-reparacion/exportar-historial

// Obtener un pedido de reparación por ID
export default router;
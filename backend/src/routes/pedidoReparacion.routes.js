"use strict";
import { Router } from "express";
// eslint-disable-next-line max-len
import { crearPedidoReparacion, obtenerPedidoPorId, obtenerPedidosReparacion } from "../controllers/pedidoReparacion.controller.js";

const router = Router();

// Crear un nuevo pedido de reparación
router.post("/", crearPedidoReparacion);

// Obtener todos los pedidos de reparación
router.get("/", obtenerPedidosReparacion);

// Obtener un pedido de reparación por ID
router.get("/:id", obtenerPedidoPorId);

// Puedes agregar más rutas según sea necesario, como actualizar o eliminar

export default router;

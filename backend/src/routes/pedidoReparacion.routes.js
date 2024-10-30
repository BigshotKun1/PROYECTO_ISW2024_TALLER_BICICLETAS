"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrSeller } from "../middlewares/authorization.middleware.js";
import { 
    crearPedidoReparacion, 
    obtenerPedidoPorId, 
    obtenerPedidosReparacion 
} from "../controllers/pedidoReparacion.controller.js";

const router = Router();

router
.use(authenticateJwt)
.use(isAdminOrSeller);

router
    .post("/", crearPedidoReparacion)
    .get("/", obtenerPedidosReparacion)
    .get("/:id", obtenerPedidoPorId);
// Obtener todos los pedidos de reparación


// Obtener un pedido de reparación por ID
export default router;

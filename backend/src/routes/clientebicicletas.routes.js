"use strict";
import { Router } from "express";
import { isAdminOrSeller } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { obtenerClientesSinBicicleta } from "../controllers/clienteBicicleta.controller.js";
import { crearClienteYBicicleta } from "../controllers/clienteBicicleta.controller.js";
const router = Router();

router
.use(authenticateJwt)
.use(isAdminOrSeller);

router
    .post("/", crearClienteYBicicleta)//* http://localhost:3000/api/clientebicicleta/
    .get("/sin", obtenerClientesSinBicicleta) //* http://localhost:3000/api/clientebicicleta/sin

export default router;
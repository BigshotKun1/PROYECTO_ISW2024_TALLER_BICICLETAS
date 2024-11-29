"use strict";
import { Router } from "express";
import { isAdminOrSeller } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {  
  createCliente,
  deleteCliente,
  getCliente,
  getClientes,
  updateCliente,
} from "../controllers/cliente.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdminOrSeller);

router
    .post("/", createCliente) //* http://localhost:3000/api/cliente/
    .get("/all", getClientes) //* http://localhost:3000/api/cliente/all
    .get("/detail/:rut", getCliente) //* http://localhost:3000/api/cliente/detail/:rut
    .patch("/detail/", updateCliente) // Falta el controlador updateCliente
    .delete("/detail/", deleteCliente); // Falta el controlador deleteCliente

export default router;
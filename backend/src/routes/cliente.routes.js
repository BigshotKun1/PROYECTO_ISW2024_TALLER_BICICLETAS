"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
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
  .use(isAdmin);

router
    .post("/", createCliente)
    .get("/", getClientes)
    .get("/detail/", getCliente)
    .patch("/detail/", updateCliente)
    .delete("/detail/", deleteCliente);

export default router;
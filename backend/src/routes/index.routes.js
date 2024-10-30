"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import clienteRoutes from "./cliente.routes.js";
import pedidoReparacionRoutes from "./pedidoReparacion.routes.js";
import bicicletaRoutes from "./bicicleta.routes.js";


const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/cliente", clienteRoutes)
    .use("/pedidoReparacion", pedidoReparacionRoutes)
    .use("/bicicleta", bicicletaRoutes);
export default router;
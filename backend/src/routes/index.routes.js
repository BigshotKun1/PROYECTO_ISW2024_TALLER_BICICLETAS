"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import clienteRoutes from "./cliente.routes.js";
import pedidoReparacionRoutes from "./pedidoReparacion.routes.js";
import bicicletaRoutes from "./bicicleta.routes.js";
import productosRoutes from "./productos.routes.js"
import marcaRoutes from "./marca.routes.js";
import categoriaRoutes from "./categoria.routes.js";
import estadisticasRoutes from "./estadisticas.routes.js";

const router = Router();

router
    .use("/productos", productosRoutes)
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/cliente", clienteRoutes)
    .use("/pedidoReparacion", pedidoReparacionRoutes)
    .use("/bicicleta", bicicletaRoutes)
    .use("/marca", marcaRoutes)
    .use("/categoria", categoriaRoutes)
    .use("/estadisticas", estadisticasRoutes);
export default router;
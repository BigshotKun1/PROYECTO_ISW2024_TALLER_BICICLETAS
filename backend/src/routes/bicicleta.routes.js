import { Router } from "express";
import {
    crearBicicletaController,
    eliminarBicicletaController,
    obtenerBicicletasController,
    obtenerBicicletasPorClienteController
} from "../controllers/bicicleta.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrSeller } from "../middlewares/authorization.middleware.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdminOrSeller);

router  
.post("/", isAdminOrSeller, crearBicicletaController) //* http://localhost:3000/api/bicicleta/
.get("/all", obtenerBicicletasController) //* http://localhost:3000/api/bicicleta/all
.get("/cliente/:rut", obtenerBicicletasPorClienteController) //* http://localhost:3000/api/bicicleta/cliente/:rut
.delete("/:id_Bicicleta",isAdminOrSeller,eliminarBicicletaController); //* http://localhost:3000/api/bicicleta/:id_bici

export default router;
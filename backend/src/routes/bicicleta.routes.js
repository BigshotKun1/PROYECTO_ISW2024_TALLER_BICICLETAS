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
    .post("/", isAdminOrSeller, crearBicicletaController) //* http://localhost:3000/api/bicicleta/ - post
    .get("/", obtenerBicicletasController) //* http://localhost:3000/api/bicicleta/all - get
    .get("/cliente/:rut", obtenerBicicletasPorClienteController) //* http://localhost:3000/api/bicicleta/:rut - get
    .delete("/:id_bicicleta", isAdminOrSeller, eliminarBicicletaController);
    //* http://localhost:3000/api/bicicleta/:id_bicicleta - delete

export default router;

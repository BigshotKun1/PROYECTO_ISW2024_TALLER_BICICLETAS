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
    .post("/", isAdminOrSeller, crearBicicletaController) // Crear bicicleta
    .get("/", obtenerBicicletasController) // Obtener todas las bicicletas
    .get("/cliente/:rut", obtenerBicicletasPorClienteController) // Obtener bicicletas de un cliente por RUT
    .delete("/:id_bicicleta", isAdminOrSeller, eliminarBicicletaController); // Eliminar una bicicleta por ID

export default router;

import { Router } from "express";
import { getAll, getById, createEstadoReparacion, deleteEstadoReparacion, updateEstadoReparacion  } from "../controllers/estado_reparacion.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrSeller, isMecanic } from "../middlewares/authorization.middleware.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isMecanic);

// Ruta para obtener las estadísticas del taller
router.get("/", getAll) //* http://localhost:3000/api/estado_reparacion
router.get("/:id", getById) //* http://localhost:3000/api/estado_reparacion/:id
router.post("/", createEstadoReparacion) //* http://localhost:3000/api/estado_reparacion - post
router.patch("/:id", updateEstadoReparacion) //* http://localhost:3000/api/estado_reparacion/:id
router.delete("/:id", deleteEstadoReparacion); //* http://localhost:3000/api/estado_reparacion/:id

export default router;
import { Router } from "express";
import { obtenerEstadisticasTaller } from "../controllers/estadisticas.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

// Ruta para obtener las estadísticas del taller
router.get("/", obtenerEstadisticasTaller); //* http://localhost:3000/api/estadisticas

export default router;
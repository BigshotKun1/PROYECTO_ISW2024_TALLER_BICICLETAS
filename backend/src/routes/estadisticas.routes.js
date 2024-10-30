// backend/src/routes/estadisticas.routes.js
import { Router } from "express";
import { obtenerEstadisticas } from "../controllers/estadisticas.controller.js";
import { authenticateJwt, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Middleware para verificar si el usuario es administrador
router.use(authenticateJwt);
router.use(isAdmin);

// Ruta para obtener las estadísticas del taller
router.get("/estadisticas", obtenerEstadisticas);

export default router;
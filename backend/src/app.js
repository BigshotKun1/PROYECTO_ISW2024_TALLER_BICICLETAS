import express from "express";
import estadisticasRoutes from "./src/routes/estadisticas.routes.js";
import pedidoReparacionRoutes from "./src/routes/pedidoReparacion.routes.js";

const app = express();

// Middleware y configuración de la aplicación
app.use(express.json());

// Rutas
app.use("/api/estadisticas", estadisticasRoutes);
app.use("/api/pedidoReparacion", pedidoReparacionRoutes);

// Otros middlewares y configuración...

export default app;
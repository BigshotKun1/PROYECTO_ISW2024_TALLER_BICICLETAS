import { Router } from "express";

import {
    createProducto,
    getProducto,
    getProductos
} from "../controllers/productos.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrSeller } from "../middlewares/authorization.middleware.js";

const router = Router();

router 
    .use(authenticateJwt)
    .use(isAdminOrSeller);

router.post("/", createProducto); //* http://localhost:3000/api/productos - post
router.get("/all", getProductos); //* http://localhost:3000/api/productos/all - get 
router.get("/:id",getProducto); //* http://localhost:3000/api/productos/id -get 

export default router;
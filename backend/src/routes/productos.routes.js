import { Router } from "express";
import { creProd, 
    delProd, 
    getProd, 
    getProductos, 
    updProd } from "../controllers/productos.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrSeller } from "../middlewares/authorization.middleware.js";

const router = Router();

router 
    .use(authenticateJwt)
    .use(isAdminOrSeller);

router.post("/crear", creProd); //* http://localhost:3000/api/productos - post
router.get("/:id",getProd); //* http://localhost:3000/api/productos/:id -get 
router.get("/", getProductos); //* http://localhost:3000/api/productos/all - get 
router.delete("/:id", delProd); //* http://localhost:3000/api/productos/:id - delete
router.put("/:id", updProd); //* http://localhost:3000/api/productos/:id - put

export default router;
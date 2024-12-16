import { Router } from "express";
import { creProd, delProd, getProd, getProds, updProd, } from "../controllers/productos.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrSeller } from "../middlewares/authorization.middleware.js";

const router = Router();

router 
    .use(authenticateJwt)
    .use(isAdminOrSeller);

router.post("/", creProd); //* http://localhost:3000/api/productos - post
router.get("/:id", getProd); //* http://localhost:3000/api/productos/:id -get 
router.get("/", getProds); //* http://localhost:3000/api/productos - get 
router.delete("/:id", delProd); //* http://localhost:3000/api/productos/:id - delete
router.put("/:id", updProd); //* http://localhost:3000/api/productos/:id - put

export default router;
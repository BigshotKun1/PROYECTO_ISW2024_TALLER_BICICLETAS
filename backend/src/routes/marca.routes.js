import { Router } from "express";
import { creMarc, delMarc, getMarc, getMarcs, updMarc } from "../controllers/marcas.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrSeller } from "../middlewares/authorization.middleware.js";

const router = Router();

router.use(authenticateJwt).use(isAdminOrSeller);

router.post("/", creMarc); //* http://localhost:3000/api/marcas - post
router.get("/all", getMarcs); //* http://localhost:3000/api/marcas/all - get
router.get("/:id", getMarc); //* http://localhost:3000/api/marcas/:id - get
router.delete("/:id", delMarc); //* http://localhost:3000/api/marcas/:id - delete
router.put("/:id", updMarc); //* http://localhost:3000/api/marcas/:id  - put

export default router;
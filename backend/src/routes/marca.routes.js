import { Router } from "express";
import { creMarc, delMarc, getMarc, getMarcs, updMarc } from "../controllers/marcas.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrSeller } from "../middlewares/authorization.middleware.js";

const router = Router();

router.use(authenticateJwt).use(isAdminOrSeller);

router.post("/", creMarc); //* http://localhost:3000/api/marca - post
router.get("/all", getMarcs); //* http://localhost:3000/api/marca/all - get
router.get("/:id", getMarc); //* http://localhost:3000/api/marca/:id - get
router.delete("/:id", delMarc); //* http://localhost:3000/api/marca/:id - delete
router.put("/:id", updMarc); //* http://localhost:3000/api/marca/:id  - put

export default router;
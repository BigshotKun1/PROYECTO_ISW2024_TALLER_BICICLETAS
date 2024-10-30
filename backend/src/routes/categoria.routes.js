import { Router } from "express";
import { creCat, delCat, getCat, getCats, updCat } from "../controllers/categoria.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrSeller } from "../middlewares/authorization.middleware.js";

const router = Router();

router.use(authenticateJwt).use(isAdminOrSeller);

router.post("/", creCat); //* http://localhost:3000/api/categoria - post
router.get("/all", getCats); //* http://localhost:3000/api/categoria/all - get
router.get("/:id", getCat); //* http://localhost:3000/api/categoria/:id - get
router.delete("/:id", delCat); //* http://localhost:3000/api/categoria/:id - delete
router.put("/:id", updCat); //* http://localhost:3000/api/categoria/:id - put

export default router;
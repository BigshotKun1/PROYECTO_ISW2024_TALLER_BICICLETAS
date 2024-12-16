"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
  .post("/", createUser)         //* http://localhost:3000/api/user        - post
  .get("/all", getUsers)         //* http://localhost:3000/api/user/all    - get
  .get("/:rut", getUser)         //* http://localhost:3000/api/user/:rut   - get
  .patch("/:rut", updateUser)    //* http://localhost:3000/api/user/:rut   - patch
  .delete("/:rut", deleteUser);  //* http://localhost:3000/api/user/:rut   - delete

export default router;
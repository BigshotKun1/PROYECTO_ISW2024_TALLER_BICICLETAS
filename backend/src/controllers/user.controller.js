"use strict";
import {
  createUserService,
  deleteUserService,
  getUserService,
  getUsersService,
  updateUserService,
} from "../services/user.service.js";
import {
  userBodyValidation,
  userQueryValidation,
} from "../validations/user.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createUser(req, res) {
  try {
    const { body } = req;

    const { error } = userBodyValidation.validate(body);

    if (error)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        error.message,
      );

    const [user, errorUser] = await createUserService(req.body);

    if (errorUser) {
      return res.status(400).json({ message: errorUser });
    }
    return res.status(201).json({ message: "Usuario creado correctamente", user });
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getUser(req, res) {
  try {
    const { rut } = req.params;

    const [user, errorUser] = await getUserService({ rut });

    if (errorUser) return handleErrorClient(res, 404, errorUser);

    handleSuccess(res, 200, "Usuario encontrado", user);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getUsers(req, res) {
  try {
    const [users, errorUsers] = await getUsersService();

    if (errorUsers) return handleErrorClient(res, 404, errorUsers);

    users.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Usuarios encontrados", users);
  } catch (error) {
    handleErrorServer(
      res,
      500,
      error.message,
    );
  }
}

export async function updateUser(req, res) {
  try {
    const { rut } = req.params;
    const userData = req.body;
    const currentUser = req.user; 

    const [user, errorUser] = await updateUserService(rut, userData, currentUser);

    if (errorUser) return handleErrorClient(res, 400, "Error actualizando al usuario", errorUser);

    handleSuccess(res, 200, "Usuario actualizado correctamente", user);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteUser(req, res) {
  try {
    const { rut } = req.params;
    const currentUser = req.user;

    const [user, errorUser] = await deleteUserService(rut, currentUser);

    if (errorUser) return handleErrorClient(res, 404, errorUser);

    handleSuccess(res, 200, "Usuario eliminado correctamente", user);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
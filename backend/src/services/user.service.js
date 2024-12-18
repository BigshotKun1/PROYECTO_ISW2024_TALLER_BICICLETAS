"use strict";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";
import { ROLES } from "../roles.js";

export async function createUserService(body) {
  try {
    const { rut, email, password, rol } = body;

    const userRepository = AppDataSource.getRepository(User);

    if (rol === ROLES.SUPERADMIN) {
      return [null, "No se puede crear un usuario con el rol superadmin"];
    }
  
    if (rol === ROLES.ADMINISTRADOR && body.currentUser.rol !== ROLES.SUPERADMIN) {
      return [null, "No tiene acceso para asignar el rol de administrador (necesita rol superadmin)"];
    }

    if(!Object.values(ROLES).includes(rol)) {
      return [null, "Rol inválido"];
    }

    const existingUser = await userRepository.findOne({
      where: [{ rut: rut }, { email: email }],
    });
    
    if (existingUser) return [null, "Ya existe un usuario con el mismo rut o email"];

    const hashedPassword = await encryptPassword(password);
    
    const newUser = userRepository.create({
      ...body,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    await userRepository.save(newUser);
    
    const { password: _, ...userData } = newUser;
    
    return [userData, null];
  } catch (error) {
    console.error("Error al crear un usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getUserService(query) {
  try {
    const { rut } = query;

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { rut } });

    if (!user) return [null, "Usuario no encontrado"];

    const { password, ...userData } = user;

    return [userData, null];
  } catch (error) {
    console.error("Error al obtener un usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getUsersService() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    if (!users || users.length === 0) return [null, "No hay usuarios"];

    const usersData = users.map(({ password, ...user }) => user);

    return [usersData, null];
  } catch (error) {
    console.error("Error al obtener a los usuarios:", error);
    return [null, "Error interno del servidor"];
  }
}

export const updateUserService = async (rut, userData, currentUser) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { rut } });

    if (!user) {
      return [null, "Usuario no encontrado"];
    }

    if (user.rol === ROLES.SUPERADMIN && currentUser.rol !== ROLES.SUPERADMIN) {
      return [null, "No tiene acceso para actualizar a este usuario (necesita rol superadmin)"];
    }

    if (userData.rol === ROLES.SUPERADMIN) {
      return [null, "No se puede asignar el rol de superadmin"];
    }

    if (currentUser.rol === ROLES.ADMINISTRADOR && user.rol === ROLES.ADMINISTRADOR) {
      return [null, "No tiene acceso para actualizar este usuario (necesita rol superadmin)"];
    }

    if (currentUser.rol === ROLES.ADMINISTRADOR && userData.rol === ROLES.ADMINISTRADOR) {
      return [null, "No tiene acceso para asignar el rol de administrador (necesita rol superadmin)"];
    }

    if (userData.password) {
      userData.password = await encryptPassword(userData.password);
    }

    Object.assign(user, userData);
    
    await userRepository.save(user);
    
    return [user, null];
  } catch (error) {
    return [null, error.message];
  }
}

export const deleteUserService = async (rut, currentUser) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { rut } });

    if (!user) {
      return [null, "Usuario no encontrado"];
    }

    if (user.rol === "superadmin") {
      return [null, "No se puede eliminar el usuario superadmin."];
    }

    if (user.rol === "administrador" && currentUser.rol !== "superadmin") {
      return [null, "No se puede eliminar un usuario administrador (Se necesita rol superadmin)."];
    }

    await userRepository.remove(user);
    return [user, null];
  } catch (error) {
    return [null, error.message];
  }
};
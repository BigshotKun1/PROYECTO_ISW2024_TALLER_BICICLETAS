"use strict";
import User from "../entity/user.entity.js";
import Producto from "../entity/producto.entity.js";
import Cliente from "../entity/cliente.entity.js";
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

async function createUsers() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Alexis Salazar Jara",
          rut: "21.308.770-3",
          email: "administrador202@gmail.cl",
          password: await encryptPassword("admin1234"),
          rol: "administrador",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Juan Carlos Salazar Araya",
          rut: "9.123.678.5",
          email: "Administrador2024@gmail.cl",
          password: await encryptPassword("admin2024"),
          rol: "administrador",
        })
      ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Matias Ignacio Cartes Rojas",
            rut: "14.263.218-9",
            email: "Mecanico2024@gmail.cl",
            password: await encryptPassword("mecanico2024"),
            rol: "mecanico",
          }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Felipe Bastian Pinilla Paredez",
          rut: "20.183.254-4",
          email: "vendedor2024@gmail.cl",
          password: await encryptPassword("vendedor2024"),
          rol: "vendedor",
        }),
      ),
  
    ]);
    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

async function createClientes() {
  try {
    const userRepository = AppDataSource.getRepository(Cliente);

    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          rut: "21.005.789-7",
          nombreCompleto: "Vicente Castillo",
          telefono: "987654321",
          password: await encryptPassword("vice1234"),
          rol: "administrador",
        }),
      ),
    ]);
    console.log("* => Clientes creados exitosamente");
  } catch (error) {
    console.error("Error al crear Cliente:", error);
  }
}

async function createProductos() {
  try {
    const userRepository = AppDataSource.getRepository(Producto);

    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          id: 1,
          nombre: "Bicicleta de descenso",
          precio: 500000,
          cantidad: 2,
          marca: "Trek",
          categoria: "Descenso",
          descuento: 0,
          descuentoP: 0,
          total: 500000
        }),
      ),
    ]);
    console.log("* => Producto creado exitosamente");
  } catch (error) {
    console.error("Error al crear Producto:", error);
  }
}

export { createUsers, createClientes, createProductos };
"use strict";
import User from "../entity/user.entity.js";
import Producto from "../entity/producto.entity.js";
import Cliente from "../entity/cliente.entity.js";
import Estado from "../entity/estado.entity.js";
import Bicicleta from "../entity/bicicleta.entity.js";
import Categoria from "../entity/categoria.entity.js";
import Marcas from "../entity/marcas.entity.js";
import PedidoReparacion from "../entity/pedidosReparacion.entity.js";
import EstadosReparacion from "../entity/estado_reparacion.entity.js";
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";
import passport from "passport";
const { use } = passport;

async function createUsers() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Vicente Castillo Salazar",
          rut: "21.005.789-7",
          email: "superadmin2024@gmail.cl",
          password: await encryptPassword("superadmin2024"),
          rol: "superadmin",
        }),
      ),
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
        }),      ),
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
        }),
      ),
      userRepository.save(
        userRepository.create({
          rut: "20.000.000-0",
          nombreCompleto: "Juan Perez",
          telefono: "930737579",
        }),
      ),
      userRepository.save(
        userRepository.create({
          rut: "21.123.456-7",
          nombreCompleto: "Omar Castro",
          telefono: "987458325",
        }),
      ),
      userRepository.save(
        userRepository.create({
          rut: "21.036.331-9",
          nombreCompleto: "Bairon andres sanhuesa torres",
          telefono: "962774850",

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
          idM: 1,
          idC: 1,
          idE: 1,
          descuento: 0,
          descuentoP: 0,
          total: 500000
        }),
      ),
      userRepository.save(
        userRepository.create({
          id: 2,
          nombre: "Frenos de disco",
          precio: 15000,
          cantidad: 20,
          idM: 2,
          idC: 2,
          idE: 2,
          descuento: 0,
          descuentoP: 0,
          total: 15000
        }),
      ),
      userRepository.save(
        userRepository.create({
          id: 3,
          nombre: "Rueda trasera",
          precio: 20000,
          cantidad: 10,
          idM: 2,
          idC: 2,
          idE: 1,
          descuento: 0,
          descuentoP: 0,
          total: 20000
        }),
      ),
    ]);
    console.log("* => Producto creado exitosamente");
  } catch (error) {
    console.error("Error al crear Producto:", error);
  }
}

async function createEstados() {
  try {
    const userRepository = AppDataSource.getRepository(Estado);

    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          idE: 1,
          estados: "Disponible",
        }),
      ),
      userRepository.save(
        userRepository.create({
          idE: 2,
          estados: "Agotado", 
        })
      ),
      userRepository.save(
        userRepository.create({
          idE: 3,
          estados: "Para Reparaciones",
        }),
      ),
      userRepository.save(
        userRepository.create({
          idE: 4,
          estados: "Inhabilitado",
        }),
      ),
      userRepository.save(
        userRepository.create({
          idE: 5,
          estados: "En espera por falta de repuestos",
        }),
      ),


    ]);
    console.log("* => Estados creados exitosamente");
  } catch (error) {
    console.error("Error al crear el estado:", error);
  }
}

async function createBicicleta() {
  try {
    const userRepository = AppDataSource.getRepository(Bicicleta);

    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          id_Bicicleta: 1,
          marca: "Trek",
          modelo: "Marlin 7",
          color : "Rojo",
          cliente: { rut: "21.005.789-7" } // Usar un rut existente en la tabla clientes
        }) 
      ),
      userRepository.save(
        userRepository.create({
          id_Bicicleta: 2,
          marca: "Specialized",
          modelo: "Rockhopper",
          color : "Azul",
          cliente: { rut: "20.000.000-0" },
        }),
      ),
      userRepository.save(
        userRepository.create({
          id_Bicicleta: 3,
          marca: "Giant",
          modelo: "Talon 3",
          color: "Negro",
          cliente: { rut: "21.123.456-7" },
        }),
      ),
    ]);  
    console.log("* => Bicicletas creadas exitosamente");
  } catch (error) {
    console.error("Error al crear Bicicleta:", error);
  }
}

async function createCategoria() {
  try {
    const userRepository = AppDataSource.getRepository(Categoria);

    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
        idC: 0,
        categorias: "Sin categoria",

        }),
      ),
      userRepository.save(  
        userRepository.create(
          {
            idC: 1,
            categorias: "Frenos",
          }
        )
      ),
      userRepository.save(
        userRepository.create(
          {
            idC: 2,
            categorias: "Ruedas",
          }
        )
      ),
  
    ]);
    console.log("* => Categorias creadas exitosamente");
  } catch (error) {
    console.error("Error al crear Categoria:", error);
  }
}

async function createMarcas() {
  try {
    const userRepository = AppDataSource.getRepository(Marcas);

    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
        idM: 0,
        marcas: "Sin marca",
        }),
      ),
      userRepository.save(  
        userRepository.create(
          {
        idM: 1,
        marcas: "Maxxis",
          }
        )
      ),
      userRepository.save(
        userRepository.create(
          {
        idM: 2,
        marcas: "Shimano",
          }
        )
      ),
  
    ]);
    console.log("* => Marcas creadas exitosamente");
  } catch (error) {
    console.error("Error al crear Marcas:", error);
  }
}

async function createEstados_Reparacion() {
  try {
    const userRepository = AppDataSource.getRepository(EstadosReparacion);

    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
            idE_R: 1,
            estados_r: "En reparacion",
        }),
      ),
      userRepository.save(
        userRepository.create({
          idE_R: 2,
          estados_r: "Finalizado", 
        })
      ),
      userRepository.save(
        userRepository.create({
          idE_R: 3,
          estados_r: "En espera por falta de repuestos",
        }),
      ),
      
    ]);
    console.log("* => Estados_Reparacion creados exitosamente");
  } catch (error) {
    console.error("Error al crear el estado_reparacion:", error);
  }
}

async function createpedidoReparacion() {
  try {
    const userRepository = AppDataSource.getRepository(PedidoReparacion);

    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          id_PedidoReparacion: 1,
          motivoReparacion: "Necesita un Cambio de cadena",
          descripcionReparacion: "Se realiza Cambio de cadena",
          cliente: { rut: "21.005.789-7" },
          bicicleta: { id_Bicicleta: 1 },
          estadoReparacion: { idE_R: 1 },
          mecanico: { rut: "14.263.218-9" }
        })
      ),
      /*pedidoReparacionRepository.save(
        pedidoReparacionRepository.create({
          motivoReparacion: "Cambio de frenos",
          descripcionReparacion: "Cambio de frenos en ambas ruedas",
          fecha: "2024-12-12",
          bicicleta: { id_Bicicleta: 2 },
          estadoReparacion: { idE_R: 2 },
          mecanico: { rut: "14.263.218-9" },
        })
      ),
      pedidoReparacionRepository.save(
        pedidoReparacionRepository.create({
          motivoReparacion: "Cambio de rueda trasera",
          descripcionReparacion: "Cambio de rueda trasera debido a desgaste",
          fecha: "2024-12-12",
          bicicleta: { id_Bicicleta: 3 },
          estadoReparacion: { idE_R: 3 },
          mecanico: { rut: "14.263.218-9" },
        })
      ),*/
    ]);
    console.log("* => Pedidos de reparacion creados exitosamente");
  } catch (error) {
    console.error("Error al crear Pedido Reparacion:", error);
  }
}

export { 
  createUsers, 
  createClientes, 
  createEstados, 
  createBicicleta, 
  createCategoria,
  createMarcas, 
  createEstados_Reparacion,
  createpedidoReparacion,
  createProductos 
  
};
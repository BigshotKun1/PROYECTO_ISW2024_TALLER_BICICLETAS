import { AppDataSource } from "../config/configDb.js";
import Cliente from "../entity/cliente.entity.js";
import Bicicleta from "../entity/bicicleta.entity.js";

export const crearClienteYBicicletaService = async ({ cliente, bicicleta }) => {
  const clienteRepository = AppDataSource.getRepository(Cliente);
  const bicicletaRepository = AppDataSource.getRepository(Bicicleta);

  const { rut, nombreCompleto, telefono } = cliente;
  const { marca, modelo, color } = bicicleta;

  try {
    // Validar si el cliente ya existe por RUT
    const clienteExistente = await clienteRepository.findOne({ where: { rut } });
    if (clienteExistente) {
      const error = new Error("Ya existe un cliente con el mismo rut");
      error.statusCode = 400; // Código de estado correcto para errores de validación
      throw error;
    }

    // Validar si el cliente ya existe por teléfono
    const telefonoExistente = await clienteRepository.findOne({ where: { telefono } });
    if (telefonoExistente) {
      const error = new Error("Ya existe un cliente con el mismo teléfono");
      error.statusCode = 400;
      throw error;
    }

    // Crear cliente
    const nuevoCliente = clienteRepository.create({ rut, nombreCompleto, telefono });
    await clienteRepository.save(nuevoCliente);

    // Crear bicicleta asociada al cliente
    const nuevaBicicleta = bicicletaRepository.create({
      marca,
      modelo,
      color,
      cliente: nuevoCliente,
    });
    await bicicletaRepository.save(nuevaBicicleta);

    return { cliente: nuevoCliente, bicicleta: nuevaBicicleta };
  } catch (error) {
    // Propagar errores de validación
    if (error.statusCode) {
      throw error;
    }

    // Otros errores internos
    console.error("Error interno del servidor:", error);
    throw new Error("Error interno del servidor");
  }
};






export const obtenerClientesConBicicletasService = async () => {
  const clienteRepository = AppDataSource.getRepository(Cliente);
  const bicicletaRepository = AppDataSource.getRepository(Bicicleta);

  try {
    // Obtiene las bicicletas junto con sus clientes asociados
    const bicicletas = await bicicletaRepository.find({
      relations: ['cliente'], // Asegura que la relación con 'cliente' se cargue
    });

    if (!bicicletas || bicicletas.length === 0) {
      throw new Error('No se encontraron bicicletas registradas.');
    }

    // Agrupa las bicicletas por cliente
    const clientesConBicicletas = bicicletas.reduce((acc, bicicleta) => {
      const cliente = bicicleta.cliente;

      if (!acc[cliente.rut]) {
        acc[cliente.rut] = {
          rut: cliente.rut,
          nombreCompleto: cliente.nombreCompleto,
          telefono: cliente.telefono,
          bicicletas: [],
        };
      }

      acc[cliente.rut].bicicletas.push({
        id_Bicicleta: bicicleta.id_Bicicleta,
        marca: bicicleta.marca,
        modelo: bicicleta.modelo,
        color: bicicleta.color,
      });

      return acc;
    }, {});

    // Devuelve los datos agrupados como un array de clientes
    return Object.values(clientesConBicicletas);
  } catch (error) {
    console.error('Error en obtenerClientesConBicicletasService:', error);
    throw new Error('Ocurrió un error al obtener los clientes con sus bicicletas.');
  }
};

import { AppDataSource } from "../config/configDb.js";
import Cliente from "../entity/cliente.entity.js";
import Bicicleta from "../entity/bicicleta.entity.js";


export const crearClienteYBicicletaService = async ({ rut, nombreCompleto, telefono, bicicleta }) => {
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const bicicletaRepository = AppDataSource.getRepository(Bicicleta);

    try {
        // Crear cliente
        const nuevoCliente = clienteRepository.create({ rut, nombreCompleto, telefono });
        await clienteRepository.save(nuevoCliente);

        // Crear bicicleta y asociarla al cliente
        const nuevaBicicleta = bicicletaRepository.create({ ...bicicleta, cliente: nuevoCliente });
        await bicicletaRepository.save(nuevaBicicleta);

        return { cliente: nuevoCliente, bicicleta: nuevaBicicleta };
    } catch (error) {
        throw new Error(`Error al crear cliente y bicicleta: ${error.message}`);
    }
};



/*
export const createClienteYBicicletaService = async (clienteData, bicicletaData) => {
  const clienteRepository = AppDataSource.getRepository(Cliente);
  const bicicletaRepository = AppDataSource.getRepository(Bicicleta);



  try {
    // Verificar si el cliente ya existe
    const existingCliente = await clienteRepository.findOneBy({ rut: clienteData.rut });
    if (existingCliente) return [null, "Cliente con este RUT ya existe"];

    // Crear el nuevo cliente
    const nuevoCliente = clienteRepository.create(clienteData);
    const clienteCreado = await clienteRepository.save(nuevoCliente);

    // Crear la bicicleta y asociarla al cliente
    const nuevaBicicleta = bicicletaRepository.create({
      ...bicicletaData,
      cliente: clienteCreado, // Asignar el cliente recién creado
    });

    const bicicletaCreada = await bicicletaRepository.save(nuevaBicicleta);

    return [{ cliente: clienteCreado, bicicleta: bicicletaCreada }, null];
  } catch (error) {
    console.error("Error al crear cliente y bicicleta:", error);
    return [null, "Error al crear cliente y bicicleta"];
  }
};


*/
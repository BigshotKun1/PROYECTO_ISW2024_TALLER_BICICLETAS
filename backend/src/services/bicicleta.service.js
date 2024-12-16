import { AppDataSource } from "../config/configDb.js";
import Bicicleta from "../entity/bicicleta.entity.js";
import Cliente from "../entity/cliente.entity.js";

/*
export const crearBicicleta = async (datosBicicleta) => {
    const { clienteRut, marca, modelo, color } = datosBicicleta;

    // Verificar si el cliente existe en la base de datos
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const cliente = await clienteRepository.findOneBy({ rut: clienteRut });
    
    if (!cliente) {
        throw new Error("Cliente no encontrado");
    }

    // Crear una nueva bicicleta y asignarle el cliente
    const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
    const nuevaBicicleta = bicicletaRepository.create({
        marca,
        modelo,
        color,
        cliente, // Asignar la referencia del cliente encontrado
    });

    // Guardar la bicicleta en la base de datos
    return await bicicletaRepository.save(nuevaBicicleta);
};
*/

export const crearBicicleta = async ({ rut, marca, modelo, color }) => {
    try {
      // Obtener el repositorio del cliente
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const cliente = await clienteRepository.findOneBy({ rut });
  
      // Verificar si el cliente existe
      if (!cliente) {
        return [null, "Cliente no encontrado"];
      }
  
      // Obtener el repositorio de bicicletas
      const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
      
      // Crear una nueva bicicleta
      const nuevaBicicleta = bicicletaRepository.create({
        marca,
        modelo,
        color,
        cliente, // Asignar el cliente a la bicicleta
      });
  
      // Guardar la bicicleta en la base de datos
      const bicicletaCreada = await bicicletaRepository.save(nuevaBicicleta);
  
      return [bicicletaCreada, null];
    } catch (error) {
      console.error("Error al crear la bicicleta:", error);
      return [null, "Error interno del servidor"];
    }
  };

// Obtener todas las bicicletas
export const obtenerBicicletas = async () => {
    const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
    return await bicicletaRepository.find({ relations: ["cliente"] });
};

// Obtener bicicletas de un cliente específico
export const obtenerBicicletasPorCliente = async (clienteRut) => {
    const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
    return await bicicletaRepository.find({ where: { cliente: { rut: clienteRut } } });
};

// Eliminar una bicicleta por ID
export const eliminarBicicleta = async (id_Bicicleta) => {
    const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
    const bicicleta = await bicicletaRepository.findOneBy({ id_Bicicleta });
    if (bicicleta) await bicicletaRepository.remove(bicicleta);
    return bicicleta;
};

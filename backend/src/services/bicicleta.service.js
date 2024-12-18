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

export const crearBicicletaconRUT = async (req, res) => {
    try {
      // Extraer los datos del cuerpo de la solicitud
      const { marca, modelo, color } = req.body.bicicleta; // Acceder correctamente al objeto bicicleta
      const { clienteRut } = req.body;
      
      console.log("Datos recibidos:", req.body);  // Verifica que los datos lleguen correctamente
  
      // Verificar que los campos no sean nulos ni vacíos
      if (!marca || !modelo || !color) {
        return res.status(400).json({ message: "Todos los campos (marca, modelo, color) son requeridos" });
      }
  
      console.log("Verificando existencia de cliente...", clienteRut);
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const cliente = await clienteRepository.findOneBy({ rut: clienteRut });
  
      if (!cliente) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }
  
      console.log("Creando bicicleta...");
      const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
      
      const nuevaBicicleta = bicicletaRepository.create({
        marca,
        modelo,
        color,
        cliente, // Asociar el cliente
      });

      const bicicletaCreada = await bicicletaRepository.save(nuevaBicicleta);
      console.log("Bicicleta guardada:", bicicletaCreada);
  
      return res.status(201).json({ message: "Bicicleta creada correctamente", data: bicicletaCreada });
    } catch (error) {
      console.error("Error al crear bicicleta:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
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

import PedidoReparacion from "../entity/pedidoReparacion.entity.js";
import User from "../entity/user.entity.js";
import Cliente from "../entity/cliente.entity.js";
import Bicicleta from "../entity/bicicleta.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createPedidoReparacionService(body) {
try {
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);
    const userRepository = AppDataSource.getRepository(User);
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const bicicletaRepository = AppDataSource.getRepository(Bicicleta);

    // Verificar que el cliente exista
    const cliente = await clienteRepository.findOneBy({ rut: body.clienteRut });
    if (!cliente) {
    return [null, "Cliente no encontrado"];
    }

    // Verificar que la bicicleta exista
    const bicicleta = await bicicletaRepository.findOneBy({ id: body.id_Bicicleta });
    if (!bicicleta) {
    return [null, "Bicicleta no encontrada"];
    }

    // Verificar que el mecánico exista
    const mecanico = await userRepository.findOne({
    where: { rut: body.mecanico },
    });
    if (!mecanico) {
    return [null, "El mecánico no existe"];
    }
    
    const nuevoPedido = pedidoReparacionRepository.create({
        clienteRut: body.clienteRut,
        motivoReparacion: body.motivoReparacion,
        id_Bicicleta: body.id_Bicicleta,
        mecanico: mecanico
    });

    const pedidoReparacionCreado = await pedidoReparacionRepository.save(nuevoPedido);

    return [pedidoReparacionCreado, null];
    } catch (error) {
    console.error("Error al crear el pedido de reparación:", error);
    return [null, "Error interno del servidor"];
    }
}

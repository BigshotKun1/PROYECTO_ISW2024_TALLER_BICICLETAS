// pedidoReparacion.service.js
import PedidoReparacion from "../entity/pedidoReparacion.entity.js";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createPedidoReparacionService(body) {
try {
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);
    const UserRepository = AppDataSource.getRepository(User);

    const mecanico = await UserRepository.findOne({
        where: { rut: body.mecanico },
    });

    if (!mecanico) {
        return [null, "El mecánico no existe"];
    }

    /*const existingCliente = await pedidoReparacionRepository.findOne({
        where: [{ rut: body.rut }],
    });*/

    const nuevoPedido = pedidoReparacionRepository.create({
        clienteRut: body.clienteRut,
        motivoReparacion: body.motivoReparacion,
        id_Bicicleta: body.id_Bicicleta,
        mecanico: mecanico,
    });

    const pedidoReparacionCreado = await pedidoReparacionRepository.save(nuevoPedido);

    return [pedidoReparacionCreado, null];
    } catch (error) {
    console.error("Error al crear el pedido de reparación:", error);
    return [null, "Error interno del servidor"];
    }
}

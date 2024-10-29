// pedidoReparacion.service.js
import PedidoReparacion from "../entity/pedidoReparacion.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createPedidoReparacionService(clienteRut, motivoReparacion, id_Bicicleta) {
  try {
    const pedidoReparacionRepository = AppDataSource.getRepository(PedidoReparacion);

    const nuevoPedido = pedidoReparacionRepository.create({
      clienteRut,
      motivoReparacion,
      id_Bicicleta,
    });

    await pedidoReparacionRepository.save(nuevoPedido);

    return [nuevoPedido, null];
  } catch (error) {
    console.error("Error al crear el pedido de reparación:", error);
    return [null, "Error interno del servidor"];
  }
}

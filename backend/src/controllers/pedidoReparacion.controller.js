"use strict";
import { getRepository } from "typeorm";
import PedidoReparacion from "../entity/pedidoReparacion.entity.js"; // Asegúrate de que la ruta sea correcta

// Crear un nuevo pedido de reparación
export const crearPedidoReparacion = async (req, res) => {
    const { clienteRut, motivoReparacion, id_Bicicleta } = req.body; 

    const pedidoReparacion = new PedidoReparacion();
    pedidoReparacion.motivoReparacion = motivoReparacion;
    pedidoReparacion.clienteRut = clienteRut; // Asumiendo que estás usando rut como referencia
    pedidoReparacion.id_Bicicleta = id_Bicicleta; // Si estás seleccionando una bicicleta existente

    try {
        const pedidoReparacionRepository = getRepository(PedidoReparacion);
        await pedidoReparacionRepository.save(pedidoReparacion);
        return res.status(201).json(pedidoReparacion);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el pedido de reparación" });
    }
};

// Obtener todos los pedidos de reparación
export const obtenerPedidosReparacion = async (req, res) => {
    try {
        const pedidoReparacionRepository = getRepository(PedidoReparacion);
        const pedidos = await pedidoReparacionRepository.find();
        return res.json(pedidos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener los pedidos de reparación" });
    }
};

// Obtener un pedido de reparación por ID
export const obtenerPedidoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const pedidoReparacionRepository = getRepository(PedidoReparacion);
        const pedido = await pedidoReparacionRepository.findOne(id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido de reparación no encontrado" });
        }
        return res.json(pedido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener el pedido de reparación" });
    }
};

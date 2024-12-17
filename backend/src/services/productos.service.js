"use strict";
import Productos from "../entity/producto.entity.js";
import { AppDataSource } from "../config/configDb.js";

const productoRepository = AppDataSource.getRepository(Productos);

export async function getProdSer(id) {
    return await productoRepository.findOneBy({ id });
}

export async function getProdsSer() {
    try{
    const productoRepository = AppDataSource.getRepository(Productos);
    const productos = await productoRepository.find();
    return productos;
} catch (error) {
    console.error("Error en getProdsSer: ", error.message);
    throw error; // Re-lanzar el error para que lo maneje el controlador
}

}

export async function delProdSer(id) {
    const producto = await productoRepository.findOneBy({ id });
    return await productoRepository.remove(producto);
}

export async function updProdSer(id, updateData) {
    const productoEncontrado = await productoRepository.findOneBy({ id });
    if (!productoEncontrado) {
        throw new Error("Producto no encontrado");
    }

    // Realizar la actualización
    await productoRepository.update({ id }, updateData);

    // Retornar el producto actualizado
    return await productoRepository.findOneBy({ id });
}

export async function creProdSer(updateData) {
    // Obtener valores necesarios para calcular las nuevas columnas

    const precio = updateData.precio;
    const cantidad = updateData.cantidad;
    const descuento = updateData.descuento;

    // Calcular descuentoP (porcentaje del descuento aplicado)
    const descuentoP = (precio * cantidad * descuento) / 100;

    // Calcular total
    const total = (precio * cantidad) - descuentoP;

    // Añadir las columnas descuentoP y total a updateData
    updateData.descuentoP = descuentoP;
    updateData.total = total;

    // Insertar el nuevo producto en la base de datos
    const crePod = await productoRepository.create(updateData);
    if (crePod) {
        await productoRepository.save(crePod);
    }
    else {
        throw new Error("Error al insertar el producto");
    }

    // Retornar el producto actualizado
    return crePod;
}


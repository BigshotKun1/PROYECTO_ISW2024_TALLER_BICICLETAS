"use strict";
import Productos from "../entity/producto.entity.js";
import { AppDataSource } from "../config/configDb.js";

const productoRepository = AppDataSource.getRepository(Productos);
/*
export async function creProdSer(data) {
    const newProducto = productoRepository.create(data);
    return await productoRepository.save(newProducto);
}*/

export async function getProdSer(id) {
    return await productoRepository.findOneBy({ id });
}

export async function getProdsSer() {
    return await productoRepository.find();
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
    const precio = updateData.precio || productoEncontrado.precio || 0;
    const cantidad = updateData.cantidad || productoEncontrado.cantidad || 0;
    const descuento = updateData.descuento || productoEncontrado.descuento || 0;

    // Calcular descuentoP (porcentaje del descuento aplicado)
    const descuentoP = (precio * cantidad * descuento) / 100;

    // Calcular total
    const total = (precio * cantidad) - descuentoP;

    // Añadir las columnas descuentoP y total a updateData
    updateData.descuentoP = descuentoP;
    updateData.total = total;

    // Realizar la actualización
    const crePod = await productoRepository.insert(updateData);

    // Retornar el producto actualizado
    return crePod;
}


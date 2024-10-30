"use strict";
import Productos from "../entity/producto.entity.js";
import { AppDataSource } from "../config/configDb.js";

const productoRepository = AppDataSource.getRepository(Productos);

export async function createProductoService(data) {
    const newProducto = productoRepository.create(data);
    return await productoRepository.save(newProducto);
}

export async function getProductoService(id) {
    return await productoRepository.findOneBy({ id });
}

export async function getProductosService() {
    return await productoRepository.find();
}
"use strict";
import Productos from "../entity/producto.entity.js";
import { AppDataSource } from "../config/configDb.js";

const productoRepository = AppDataSource.getRepository(Productos);

export async function creProdSer(data) {
    const newProducto = productoRepository.create(data);
    return await productoRepository.save(newProducto);
}

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
    await productoRepository.update(id, updateData);
    return await getProdSer(id);
}

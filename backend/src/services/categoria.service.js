"use strict";
import Categoria from "../entity/categoria.entity.js";
import { AppDataSource } from "../config/configDb.js";

const categoriaRepository = AppDataSource.getRepository(Categoria);

export async function creCatSer(data) {
    const newCategoria = categoriaRepository.create(data);
    return await categoriaRepository.save(newCategoria);
}

export async function getCatSer(id) {
    return await categoriaRepository.findOneBy({ idC: id });
}

export async function getCatsSer() {
    return await categoriaRepository.find();
}

export async function delCatSer(id) {
    const categoria = await categoriaRepository.findOneBy({ idC: id });
    return await categoriaRepository.remove(categoria);
}

export async function updCatSer(id, updateData) {
    await categoriaRepository.update(id, updateData);
    return await getCatSer(id);
}

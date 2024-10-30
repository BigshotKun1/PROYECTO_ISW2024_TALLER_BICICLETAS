"use strict";
import Marcas from "../entity/marcas.entity.js";
import { AppDataSource } from "../config/configDb.js";

const marcasRepository = AppDataSource.getRepository(Marcas);

export async function creMarcSer(data) {
    const newMarca = marcasRepository.create(data);
    return await marcasRepository.save(newMarca);
}

export async function getMarcSer(id) {
    return await marcasRepository.findOneBy({ idM: id });
}

export async function getMarcsSer() {
    return await marcasRepository.find();
}

export async function delMarcSer(id) {
    const marca = await marcasRepository.findOneBy({ idM: id });
    return await marcasRepository.remove(marca);
}

export async function updMarcSer(id, updateData) {
    await marcasRepository.update(id, updateData);
    return await getMarcSer(id);
}
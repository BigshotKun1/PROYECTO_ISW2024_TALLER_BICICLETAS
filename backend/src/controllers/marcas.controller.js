import { creMarcSer, delMarcSer, getMarcSer, getMarcsSer, updMarcSer } from "../services/marcas.service.js";

export async function creMarc(req, res) {
    try {
        const marca = req.body;
        if (!marca) {
            return res.status(400).json({ 
                message: "Es necesario ingresar los datos de la marca", 
                data: null 
            });
        }
        const marcaSaved = await creMarcSer(marca);
        res.status(201).json({ message: "Marca agregada con éxito", data: marcaSaved });
    } catch (error) {
        console.error("Error al crear una marca:", 
            error
        );
        res.status(500).json({ 
            message: "Hubo un error al crear la marca", 
            error: error.message 
        });
    }
}

export async function getMarc(req, res) {
    try {
        const { id } = req.params;
        const marca = await getMarcSer(id);
        if (!marca) {
            return res.status(404).json({ 
                message: "Marca no encontrada" 
            });
        }
        res.status(200).json({ 
            message: "Marca encontrada", 
            data: marca 
        });
    } catch (error) {
        console.error("Error al obtener una marca:", 
            error
        );
        res.status(500).json({ 
            message: "Hubo un error al obtener la marca", 
            error: error.message 
        });
    }
}

export async function getMarcs(req, res) {
    try {
        const marcas = await getMarcsSer();
        if (!marcas) {
            return res.status(404).json({ 
                message: "Marcas no encontradas" 
            });
        }
        res.status(200).json({ message: "Marcas encontradas", 
            data: marcas 
        });
    } catch (error) {
        console.error("Error al obtener marcas:", 
            error
        );
        res.status(500).json({ 
            message: "Hubo un error al obtener las marcas", 
            error: error.message 
        });
    }
}

export async function delMarc(req, res) {
    try {
        const { id } = req.params;
        const marcaEliminada = await delMarcSer(id);
        res.status(200).json({ message: "Marca eliminada con éxito", 
            data: marcaEliminada 
        });
    } catch (error) {
        if (error.message === "Marca no encontrada") {
            return res.status(404).json({
                message: error.message,
                data: null
            });
        }
        console.error("Error al eliminar la marca:", error);
        res.status(500).json({ 
            message: "Hubo un error al eliminar la marca", 
            error: error.message 
        });
    }
}

export async function updMarc(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const marcaActualizada = await updMarcSer(id, updateData);
        res.status(200).json({ message: "Marca actualizada con éxito", 
            data: marcaActualizada 
        });
    } catch (error) {
        if (error.message === "Marca no encontrada") {
            return res.status(404).json({
                message: error.message,
                data: null
            });
        }
        console.error("Error al actualizar la marca:", 
            error
        );
        res.status(500).json({ 
            message: "Hubo un error al actualizar la marca", 
            error: error.message 
        });
    }
}
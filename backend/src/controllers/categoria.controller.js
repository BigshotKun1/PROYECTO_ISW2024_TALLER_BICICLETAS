import { creCatSer, delCatSer, getCatSer, getCatsSer, updCatSer } from "../services/categoria.service.js";

export async function creCat(req, res) {
    try {
        const categoria = req.body;
        if (!categoria) {
            return res.status(400).json({ 
            message: "Es necesario ingresar los datos de la categoría",
            data: null
            });
        }
        const categoriaSaved = await creCatSer(categoria);
        res.status(201).json({ message: "Categoría agregada con éxito", data: categoriaSaved });
    } catch (error) {
        console.error("Error al crear una categoría:", 
            error
        );
        res.status(500).json({ 
            message: "Hubo un error al crear la categoría", 
            error: error.message 
        });
    }
}

export async function getCat(req, res) {
    try {
        const { id } = req.params;
        const categoria = await getCatSer(id);
        if (!categoria) {
             return res.status(404).json({ 
                message: "Categoría no encontrada" 
            });
        }
        res.status(200).json({ 
            message: "Categoría encontrada", 
            data: categoria 
        });
    } catch (error) {
        console.error("Error al obtener una categoría:", 
            error
        );
        res.status(500).json({ 
            message: "Hubo un error al obtener la categoría", 
            error: error.message 
        });
    }
}

export async function getCats(req, res) {
    try {
        const categorias = await getCatsSer();
        if (!categorias) {
            return res.status(404).json({ 
                message: "categorias no encontradas" 
            });
        }
        res.status(200).json({ 
            message: "Categorías encontradas", 
            data: categorias 
        });
    } catch (error) {
        console.error("Error al obtener categorías:", 
            error
        );
        res.status(500).json({ 
            message: "Hubo un error al obtener las categorías", 
            error: error.message 
        });
    }
}

export async function delCat(req, res) {
    try {
        const { id } = req.params;
        const categoriaEliminada = await delCatSer(id);
        res.status(200).json({ message: "Categoría eliminada con éxito", 
            data: categoriaEliminada 
        });
    } catch (error) {
        if (error.message === "Categoria no encontrado") {
            return res.status(404).json({
                message: error.message,
                data: null
            });
        }
        console.error("Error al eliminar la categoría:", 
            error
        );
        res.status(500).json({ 
            message: "Hubo un error al eliminar la categoría", 
            error: error.message 
        });
    }
}

export async function updCat(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const categoriaActualizada = await updCatSer(id, updateData);
        res.status(200).json({ message: "Categoría actualizada con éxito", 
            data: categoriaActualizada 
        });
    } catch (error) {
        if (error.message === "Categoria no encontrado") {
            return res.status(404).json({
                message: error.message,
                data: null
            });
        }
        console.error("Error al actualizar la categoría:", 
            error
        );
        res.status(500).json({ 
            message: "Hubo un error al actualizar la categoría", 
            error: error.message 
        });
    }
}

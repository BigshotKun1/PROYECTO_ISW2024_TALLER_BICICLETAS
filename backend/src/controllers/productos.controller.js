import { creProdSer, delProdSer, getProdSer, getProdsSer, updProdSer } from "../services/productos.service.js";
/*
export async function creProd(req, res) {
    try {
        const producto = req.body;
        if (!producto) {
            return res.status(400).json({
                message: "Es necesario ingresar los datos del producto",
                data: null
            });
        }
        const productoSaved = await creProdSer(producto);
        res.status(201).json({
            message: "Producto agregado con éxito",
            data: productoSaved
        });
    } catch (error) {
        console.error("Error al crear un producto, el error es: ", error);
        res.status(500).json({
            message: "Hubo un error al crear el producto",
            error: error.message
        });
    }
}
*/
export async function getProd(req, res) {
    try {
        const { id } = req.params;
        const producto = await getProdSer(id);
        if (!producto) {
            return res.status(404).json({ 
                message: "Producto no encontrado" 
            });
        }
        res.status(200).json({
            message: "Producto encontrado",
            data: producto
        });
    } catch (error) {
        console.error("Error al obtener un producto, el error es: ", 
            error
        );
        res.status(500).json({
            message: "Hubo un error al obtener el producto",
            error: error.message
        });
    }
}

export async function getProds(req, res) {
    try {
        const productos = await getProdsSer();
        if (!productos) {
            return res.status(404).json({ message: "Productos no encontrados" });
        }
        res.status(200).json({
            message: "Productos encontrados",
            data: productos
        });
    } catch (error) {
        console.error("Error al obtener productos, el error es: ", 
            error
        );
        res.status(500).json({
            message: "Hubo un error al obtener los productos",
            error: error.message
        });
    }
}

export async function delProd(req, res) {
    try {
        const { id } = req.params;
        const productoEliminado = await delProdSer(id);
        res.status(200).json({
            message: "Producto eliminado con éxito",
            data: productoEliminado
        });
    } catch (error) {
        if (error.message === "Producto no encontrado") {
            return res.status(404).json({
                message: error.message,
                data: null
            });
        }
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({
            message: "Hubo un error al eliminar el producto",
            error: error.message
        });
    }
}

export async function creProd(req, res) {
    try {
        const { id } = req.params;
        let updateData = req.body;

        // Excluir el campo createdAt si está presente
        if (updateData.createdAt) {
            delete updateData.createdAt;
        }

        const productoActualizado = await updProdSer(id, updateData);
        res.status(200).json({
            message: "Producto actualizado con éxito",
            data: productoActualizado
        });
    } catch (error) {
        if (error.message === "Producto no encontrado") {
            return res.status(404).json({
                message: error.message,
                data: null
            });
        }
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({
            message: "Hubo un error al actualizar el producto",
            error: error.message
        });
    }
}

export async function updProd(req, res) {
    try {
        const { id } = req.params;
        let updateData = req.body;

        // Excluir el campo createdAt si está presente
        if (updateData.createdAt) {
            delete updateData.createdAt;
        }

        const productoActualizado = await updProdSer(id, updateData);
        res.status(200).json({
            message: "Producto actualizado con éxito",
            data: productoActualizado
        });
    } catch (error) {
        if (error.message === "Producto no encontrado") {
            return res.status(404).json({
                message: error.message,
                data: null
            });
        }
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({
            message: "Hubo un error al actualizar el producto",
            error: error.message
        });
    }
}
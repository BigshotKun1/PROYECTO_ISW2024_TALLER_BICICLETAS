import { createProductoService, getProductoService, getProductosService } from "../services/productos.service.js";

export async function createProducto(req, res) {
    try {
        const producto = req.body;

        if (!producto) {
            return res.status(400).json({
                message: "Es necesario ingresar los datos del producto",
                data: null
            });
        }

        const productoSaved = await createProductoService(producto);

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

export async function getProducto(req, res) {
    try {
        const { id } = req.params;
        const producto = await getProductoService(id);

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json({
            message: "Producto encontrado",
            data: producto
        });
    } catch (error) {
        console.error("Error al obtener un producto, el error es: ", error);
        res.status(500).json({
            message: "Hubo un error al obtener el producto",
            error: error.message
        });
    }
}

export async function getProductos(req, res) {
    try {
        const productos = await getProductosService();

        res.status(200).json({
            message: "Productos encontrados",
            data: productos
        });
    } catch (error) {
        console.error("Error al obtener productos, el error es: ", error);
        res.status(500).json({
            message: "Hubo un error al obtener los productos",
            error: error.message
        });
    }
}
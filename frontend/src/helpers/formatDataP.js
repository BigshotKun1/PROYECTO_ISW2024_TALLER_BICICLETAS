import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

/**
 * Formatea los datos de un producto para visualización.
 * @param {Object} producto - Datos del producto.
 * @returns {Object} Producto con los datos formateados.
 */

export function formatProductosData(producto) {
    return {
        ...producto,
        nombre: startCase(producto.nombre), // Capitaliza el nombre
        precio: `$${producto.precio.toLocaleString()}`, // Formatea el precio con formato de moneda
        cantidad: producto.cantidad.toLocaleString(), // Agrega separadores de miles
        idM: producto.idM,
        idC: producto.idC,
        idE: producto.idE,
        descuento: `$${producto.descuento}`, // Agrega el símbolo de porcentaje
        total: `$${producto.total.toLocaleString()}`, // Formatea el total con formato de moneda
        createdAt: formatTempo(producto.createdAt, "DD-MM-YYYY") // Formatea la fecha de creación
    };
}

/**
 * Convierte las cadenas de texto de un objeto de producto a minúsculas.
 * @param {Object} obj - Objeto del producto.
 * @returns {Object} Objeto con cadenas convertidas a minúsculas.
 */
export function convertirMinusculas(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].toLowerCase();
        }
    }
    return obj;
}

/**
 * Formatea los datos del producto después de una actualización.
 * @param {Object} producto - Datos del producto actualizados.
 * @returns {Object} Producto con datos formateados.
 */

export function formatPostUpdate(producto) {
    return {
        nombre: startCase(producto.nombre),
        precio: `$${producto.precio.toLocaleString()}`,
        cantidad: producto.cantidad.toLocaleString(),
        idM: producto.idM,
        idC: producto.idC,
        idE: producto.idE,
        descuento: `$${producto.descuento}`,
        total: `$${producto.total.toLocaleString()}`,
        createdAt: formatTempo(producto.createdAt, "DD-MM-YYYY")
    };
}


export function formatPostCreate(producto) { 
    return {
        nombre: startCase(producto.nombre || "Sin nombre"), // Valor predeterminado para nombre.
        precio: `$${(producto.precio ?? 0).toLocaleString()}`, // Asegúrate de que precio sea un número.
        cantidad: (producto.cantidad ?? 0).toLocaleString(), // Maneja cantidad nula o indefinida.
        idM: producto.idM || "N/A", // Valor predeterminado para idM.
        idC: producto.idC || "N/A", // Valor predeterminado para idC.
        idE: producto.idE || "N/A", // Valor predeterminado para idE.
        descuento: `$${(producto.descuento ?? 0).toLocaleString()}`, // Maneja descuento nulo.
        total: `$${(producto.total ?? 0).toLocaleString()}`, // Asegúrate de que total sea un número.
        createdAt: formatTempo(producto.createdAt, "DD-MM-YYYY") || "Fecha desconocida" // Maneja fechas nulas.
    };
}

import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

export function formatProductosData(producto) {
    return {
        ...producto,
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

export function convertirMinusculas(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].toLowerCase();
        }
    }
    return obj;
}

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
        nombre: startCase(producto.nombre || "Sin nombre"),
        precio: `$${(producto.precio ?? 0).toLocaleString()}`,
        cantidad: (producto.cantidad ?? 0).toLocaleString(),
        idM: producto.idM || "N/A",
        idC: producto.idC || "N/A",
        idE: producto.idE || "N/A",
        descuento: `$${(producto.descuento ?? 0).toLocaleString()}`,
        total: `$${(producto.total ?? 0).toLocaleString()}`,
        createdAt: formatTempo(producto.createdAt, "DD-MM-YYYY") || "Fecha desconocida"
    };
}

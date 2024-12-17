import { startCase } from 'lodash';

export function formatMarcaData(marca) {
    return {
        ...marca,
        nombre: startCase(marca.nombre),

    };
}

export function formatMarcaUpdate(marca) {
    return {
        nombre: startCase(marca.nombre),
    };
}

export function formatMarcaCreate(marca) {
    return {
        nombre: startCase(marca.nombre),
    };
}
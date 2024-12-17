import { startCase } from 'lodash';

export function formatCartegoriaData(categoria) {
    return {
        ...categoria,
        nombre: startCase(categoria.nombre),

    };
}

export function formatCartegoriaUpdate(categoria) {
    return {
        nombre: startCase(categoria.nombre),
    };
}

export function formatCartegoriaCreate(categoria) {
    return {
        nombre: startCase(categoria.nombre),
    };
}
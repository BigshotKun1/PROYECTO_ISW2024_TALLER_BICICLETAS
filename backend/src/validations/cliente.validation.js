"use strict";
import Joi from "joi";

// Validación para el campo RUT
const rutValidator = Joi.string()
.min(9)
.max(12)
.pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
.messages({
    "string.empty": "El RUT no puede estar vacío.",
    "string.base": "El RUT debe ser de tipo string.",
    "string.min": "El RUT debe tener como mínimo 9 caracteres.",
    "string.max": "El RUT debe tener como máximo 12 caracteres.",
    "string.pattern.base": "Formato RUT inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
});

// Validación para el campo nombreCompleto
const nombreCompletoValidator = Joi.string()
.min(15)
.max(50)
.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
.messages({
    "string.empty": "El nombre completo no puede estar vacío.",
    "string.base": "El nombre completo debe ser de tipo string.",
    "string.min": "El nombre completo debe tener como mínimo 15 caracteres.",
    "string.max": "El nombre completo debe tener como máximo 50 caracteres.",
    "string.pattern.base": "El nombre completo solo puede contener letras y espacios.",
});

// Validación para el campo telefono
const telefonoValidator = Joi.string()
.pattern(/^\d{9}$/)
.messages({
    "string.empty": "El teléfono no puede estar vacío.",
    "string.base": "El teléfono debe ser de tipo string.",
    "string.pattern.base": "El teléfono debe tener exactamente 9 dígitos.",
});

// Validación para el campo bicicleta
const bicicletaValidator = Joi.string()
.min(3)
.max(50)
.messages({
    "string.empty": "El campo bicicleta no puede estar vacío.",
    "string.base": "El campo bicicleta debe ser de tipo string.",
    "string.min": "El campo bicicleta debe tener como mínimo 3 caracteres.",
    "string.max": "El campo bicicleta debe tener como máximo 50 caracteres.",
});

// Validación del cuerpo del cliente
export const clienteBodyValidation = Joi.object({
rut: rutValidator.required(),
nombreCompleto: nombreCompletoValidator.required(),
telefono: telefonoValidator.required(),
bicicleta: bicicletaValidator.required(),
})
.unknown(false)
.messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

// Validación de la consulta del cliente
export const clienteQueryValidation = Joi.object({
rut: rutValidator,
})
.or("rut")
.unknown(false)
.messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un parámetro: rut.",
});

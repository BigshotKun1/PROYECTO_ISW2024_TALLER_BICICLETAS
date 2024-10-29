"use strict";
import { EntitySchema } from "typeorm";

const ProductosSCHEMA = new EntitySchema({
    name: "Producto",
    tableName: "productos",
    columns: {
    id: {
        type: "int",
        primary: true,
        generated: true,
    },
    nombre: {
        type: "varchar",
        length: 255,
        nullable: false,
    },
    precio: {
        type: "int",
        nullable: false,
    },
    cantidad: {
        type: "int",
        nullable: false,
    },
    marca: {
        type: "varchar",
        length: 255,
        nullable: false,
    },
    categoria: {
        type: "varchar",
        length: 255,
        nullable: false,
    },
    descuento: {
        type: "int",
        nullable: false,
    },
    descuentoP: {
        type: "int",
        nullable: false,
    },
    total: {
        type: "int",
        nullable: false,
    },
    createdAt: {
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false,
    },
    updatedAt: {
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
        nullable: false,
    },
    },
    indices: [
    {
        name: "IDX_PRODUCTOS",
        columns: ["id"],
        unique: true,
    } 
    ],
});

export default ProductosSCHEMA;
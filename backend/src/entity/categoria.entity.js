"use strict";
import { EntitySchema } from "typeorm";

const CategoriaSchema = new EntitySchema({
    name: "Categoria",
    tableName: "categoria",
    columns: {
        idC: {
            type: "int",
            primary: true,
            generated: true,
        },
        categorias: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
    },
    relations: {
        productos: { // Relación inversa
            type: "one-to-many",
            target: "Producto",
            inverseSide: "categoria",
        },
    },
    indices: [
        {
            name: "IDX_CATEGORIAS",
            columns: ["idC"],
            unique: true,
        },
    ],
});

export default CategoriaSchema;
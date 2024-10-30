"use strict";
import { EntitySchema } from "typeorm";

const EstadoSchema = new EntitySchema({
    name: "Estado",
    tableName: "estado",
    columns: {
        idE: {
            type: "int",
            primary: true,
            generated: true,
        },
        estados: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
    },
    relations: {
        productos: { // Relación inversa
            type: "one-to-many",
            target: "Producto",
            inverseSide: "estado",
        },
    },
    indices: [
        {
            name: "IDX_ESTADOS",
            columns: ["idE"],
            unique: true,
        },
    ],
});

export default EstadoSchema;
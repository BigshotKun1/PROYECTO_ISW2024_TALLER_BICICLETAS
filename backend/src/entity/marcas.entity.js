"use strict";
import { EntitySchema } from "typeorm";

const MarcasSchema = new EntitySchema({
    name: "Marcas",
    tableName: "marcas",
    columns: {
        idM: {
            type: "int",
            primary: true,
            generated: true,
        },
        marcas: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
    },
    relations: {
        productos: { 
            type: "one-to-many",
            target: "Productos",
            inverseSide: "marca",
        },
    },
    indices: [
        {
            name: "IDX_MARCAS",
            columns: ["idM"],
            unique: true,
        },
    ],
});

export default MarcasSchema;
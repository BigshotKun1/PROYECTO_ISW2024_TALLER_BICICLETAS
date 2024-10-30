"use strict";
import { EntitySchema } from "typeorm";

const Estado_RSchema = new EntitySchema({
    name: "EstadoReparacion",
    tableName: "estadoresparacion",
    columns: {
        idE_R: {
            type: "int",
            primary: true,
            generated: true,
        },
        estados_r: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
    },
    relations: {
        pedidoReparacion: { // Relación inversa
            type: "one-to-many",
            target: "PedidoReparacion",
            inverseSide: "estadoReparacion",
        },
    },
    indices: [
        {
            name: "IDX_ESTADOS_REPARACION",
            columns: ["idE_R"], // Cambio aquí
            unique: true,
        },
    ],
});

export default Estado_RSchema;

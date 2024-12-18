"use strict";
import { EntitySchema } from "typeorm";

const Estado_RSchema = new EntitySchema({
    name: "EstadoReparacion",
    tableName: "estadoreparacion",
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
        pedidoReparacion: { // Relación de un estado a muchos pedidos
            type: "many-to-one", // Corregido: un estado puede estar en muchos pedidos
            target: "PedidoReparacion",
            inverseSide: "estadoReparacion", // Relación inversa en PedidoReparacion
            nullable: true, // El estado puede ser nulo en los pedidos
        },
    },
    indices: [
        {
            name: "IDX_ESTADOS_REPARACION",
            columns: ["idE_R"], 
            unique: true,
        },
    ],
});

export default Estado_RSchema;

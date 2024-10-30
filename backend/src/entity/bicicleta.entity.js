"use strict";
import { EntitySchema } from "typeorm";

const BicicletaSchema = new EntitySchema({
    name: "Bicicleta",
    tableName: "bicicletas",
    columns: {
        id_Bicicleta: {
            type: "int",
            primary: true,
            generated: true,
        },
        marca: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        modelo: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        color: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
    },
    relations: {
        cliente: {
            target: "Cliente",
            type: "many-to-one",
            joinColumn: { name: "clienteRut" },
            nullable: false,
            onDelete: "CASCADE",
        },
    },
});


export default BicicletaSchema;
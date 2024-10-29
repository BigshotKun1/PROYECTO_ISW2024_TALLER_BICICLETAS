"use strict";
import { EntitySchema } from "typeorm";

const ClienteSchema = new EntitySchema({
    name: "Cliente",
    tableName: "clientes",
    columns: {
      nombreCompleto: {
        type: "varchar",
        length: 255,
        nullable: false,
      },
      rut: {
        type: "varchar",
        length: 12,
        nullable: false,
        unique: true,
      },
      telefono: {
        type: "varchar",
        length: 12,
        nullable: false,
      },
      bicicleta: {
        type: "varchar",
        length: 255,
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
        name: "IDX_USER",
        columns: ["id"],
        unique: true,
      },
      {
        name: "IDX_USER_RUT",
        columns: ["rut"],
        unique: true,
      },
      {
        name: "IDX_USER_EMAIL",
        columns: ["email"],
        unique: true,
      },
    ],
  });
  
  
  export default ClienteSchema;
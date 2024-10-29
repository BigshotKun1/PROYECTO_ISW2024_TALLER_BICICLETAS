"use strict";
import { EntitySchema } from "typeorm";

const ClienteSchema = new EntitySchema({
  name: "Cliente",
  tableName: "clientes",
  columns: {
    rut: {
      type: "varchar",
      length: 12,
      nullable: false,
      primary: true,
      unique: true,
    },
    nombreCompleto: {
      type: "varchar",
      length: 255,
      nullable: false,
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
  relations: {
    pedidosReparacion: {
      target: "PedidoReparacion",
      type: "one-to-many", // Un cliente puede tener muchos pedidos de reparación
      inverseSide: "cliente", // El lado inverso de la relación
    },
  },
  indices: [
    {
      name: "IDX_CLIENTE_RUT",
      columns: ["rut"],
      unique: true,
    },
    {
      name: "IDX_CLIENTE_TELEFONO",
      columns: ["telefono"],
      unique: true,
    },
  ],
});

export default ClienteSchema;

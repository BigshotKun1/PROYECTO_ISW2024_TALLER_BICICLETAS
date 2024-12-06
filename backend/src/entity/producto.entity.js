"use strict";
import { EntitySchema } from "typeorm";

const ProductosSCHEMA = new EntitySchema({
    name: "Productos",
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
        idM: {
            type: "int",
            nullable: false,
        },
        idC: { 
            type: "int",
            nullable: false,
        },
        idE: { 
            type: "int",
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
    
    relations: {
        marca: { 
            type: "many-to-one", 
            target: "Marcas", 
            joinColumn: { name: "idM", },
        },
        categoria: { 
            type: "many-to-one", 
            target: "Categoria",
            joinColumn: { name: "idC",  },
        },
        estado: { 
            type: "many-to-one", 
            target: "Estado",
            joinColumn: { name: "idE",  },
        },
    },
    relations: {
        pedidosReparacion: {
            target: "PedidoReparacion",
            type: "many-to-many",
            joinTable: {
                name: "productos_pedidos", // Nombre de la tabla intermedia
                joinColumn: {
                    name: "productoId",
                    referencedColumnName: "id",
                },
                inverseJoinColumn: {
                    name: "pedidoReparacionId",
                    referencedColumnName: "id_PedidoReparacion",
                }, }
     }, },
    indices: [
        {
            name: "IDX_PRODUCTOS_IDM",
            columns: ["idM"],
        },
        {
            name: "IDX_PRODUCTOS_IDC",
            columns: ["idC"],
        },
        {
            name: "IDX_PRODUCTOS_IDE",
            columns: ["idE"],
        },
    ],
});

export default ProductosSCHEMA;
import { EntitySchema } from "typeorm";

const PedidoReparacionSchema = new EntitySchema({
name: "PedidoReparacion",
tableName: "PedidosReparaciones",
columns: {
    id_PedidoReparacion: {
    type: "int",
    primary: true,
    generated: true,
    },
    motivoReparacion: {
    type: "varchar",
    length: 255,
    nullable: false,
    },
    descripcionReparacion: {
        type: "text",
        nullable: true,
    },
    //mecanico: {
      //  type: "varchar",
        //length: 12,
        //nullable: false,
    //},
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
    cliente: {
    target: "Cliente",
    type: "many-to-one",
    joinColumn: {
        name: "clienteRut",
        },
    nullable: false,
    onDelete: "CASCADE",
    },
    bicicleta: {
        target: "Bicicleta",
        type: "many-to-one", // Un pedido puede referirse a una bicicleta
        joinColumn: { name: "id_Bicicletas" }, // Aquí defines la columna que almacenará el id de bicicleta
        nullable: false, // Asegúrate de que este campo no sea nulo
    },
    productos: {
        target: "Productos",
        type: "many-to-many",
        joinTable: {
            name: "productos_pedidos", // Nombre de la tabla intermedia
            joinColumn: {
                name: "pedidoReparacionId",
                referencedColumnName: "id_PedidoReparacion",
            },
            inverseJoinColumn: {
                name: "productoId",
                referencedColumnName: "id",

                                },
                    },
    },
    estadoReparacion: { // Relación inversa
    type: "many-to-one",
    target: "EstadoReparacion",
    joinColumn: {
    name: "idE_R",
    },
    nullable: false,
    inverseSide: "pedidoReparacion",
    },
},
});

export default PedidoReparacionSchema;

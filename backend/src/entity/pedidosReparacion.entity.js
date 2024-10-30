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
    piezasUtilizadas: {
        type: "text",
        nullable: true,
    },
    estado: {
        type: "varchar",
        length: 20,
        default: "pendiente",
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
        type: "many-to-one",
        joinColumn: { name: "id_Bicicletas" },
        nullable: false,
        
    },
},
});

export default PedidoReparacionSchema;

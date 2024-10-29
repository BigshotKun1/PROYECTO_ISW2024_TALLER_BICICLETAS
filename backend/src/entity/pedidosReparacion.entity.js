import { EntitySchema } from "typeorm";

const PedidoReparacionSchema = new EntitySchema({
  name: "PedidoReparacion",
  tableName: "PedidosReparaciones",
  columns: {
    id_Bicicleta: {
      type: "int",
      primary: true,
      generated: true,
    },
    motivoReparacion: {
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
    cliente: {
      target: "Cliente",
      type: "many-to-one",
      joinColumn: {
        name: "clienteRut", // Nombre del campo FK en la tabla PedidosReparaciones
        referencedColumnName: "rut", // Nombre de la columna en Cliente que se referencia
      },
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});

export default PedidoReparacionSchema;

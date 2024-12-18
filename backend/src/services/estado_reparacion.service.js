import EstadoReparacion from '../entity/estado_reparacion.js';
import { AppDataSource } from '../config/configDb.js';

// Servicio para la lógica de negocio de EstadoReparacion
class EstadoReparacionService {

    // Obtener todos los estados de reparación
    static async getAll() {
        try {
            const estadoReparacionRepository = AppDataSource.getRepository(EstadoReparacion);
            const estados = await estadoReparacionRepository.find();
            console.log(estados);
            return estados;
        } catch (error) {
            throw new Error('Error al obtener los estados de reparación: ' + error.message);
        }
    }

    // Obtener un estado de reparación por id
    static async getById(id) {
        try {
            const estadoReparacionRepository = AppDataSource.getRepository(EstadoReparacion);
            const estado = await estadoReparacionRepository.findOne({ where: { idE_R: id } });
            if (!estado) {
                throw new Error('Estado de reparación no encontrado');
            }
            return estado;
        } catch (error) {
            throw new Error('Error al obtener el estado de reparación: ' + error.message);
        }
    }

    // Crear un nuevo estado de reparación
    static async create(estados_r) {
        try {
            const estadoReparacionRepository = AppDataSource.getRepository(EstadoReparacion);
            const newEstado = estadoReparacionRepository.create({ estados_r });
            await estadoReparacionRepository.save(newEstado);
            return newEstado;
        } catch (error) {
            throw new Error('Error al crear el estado de reparación: ' + error.message);
        }
    }

    // Actualizar un estado de reparación
    static async update(id, estados_r) {
        try {
            const estadoReparacionRepository = AppDataSource.getRepository(EstadoReparacion);
            const estado = await estadoReparacionRepository.findOne({ where: { idE_R: id } });
            if (!estado) {
                throw new Error('Estado de reparación no encontrado');
            }
            estado.estados_r = estados_r;
            await estadoReparacionRepository.save(estado);
            return estado;
        } catch (error) {
            throw new Error('Error al actualizar el estado de reparación: ' + error.message);
        }
    }

    // Eliminar un estado de reparación
    static async delete(id) {
        try {
            const estadoReparacionRepository = AppDataSource.getRepository(EstadoReparacion);
            const estado = await estadoReparacionRepository.findOne({ where: { idE_R: id } });
            if (!estado) {
                throw new Error('Estado de reparación no encontrado');
            }
            await estadoReparacionRepository.remove(estado);
            return { message: 'Estado de reparación eliminado' };
        } catch (error) {
            throw new Error('Error al eliminar el estado de reparación: ' + error.message);
        }
    }
}

export default EstadoReparacionService;

import EstadoReparacionService from '../services/estado_reparacion.service.js';

export const getAll = async (req, res) => {
    try {
        const estados = await EstadoReparacionService.getAll();
        res.status(200).json(estados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const estado = await EstadoReparacionService.getById(id);
        res.status(200).json(estado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createEstadoReparacion = async (req, res) => {
    const { estados_r } = req.body;
    try {
        const newEstado = await EstadoReparacionService.create(estados_r);
        res.status(201).json(newEstado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEstadoReparacion = async (req, res) => {
    const { id } = req.params;
    const { estados_r } = req.body;
    try {
        const updatedEstado = await EstadoReparacionService.update(id, estados_r);
        res.status(200).json(updatedEstado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteEstadoReparacion = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await EstadoReparacionService.delete(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

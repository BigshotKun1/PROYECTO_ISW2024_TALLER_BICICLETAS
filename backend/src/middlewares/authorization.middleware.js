import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import {
handleErrorClient,
handleErrorServer,
} from "../handlers/responseHandlers.js";

export async function isAdmin(req, res, next) {
try {
    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOneBy({ email: req.user.email });

    if (!userFound) {
    return handleErrorClient(
        res,
        404,
        "Usuario no encontrado en la base de datos",
    );
    }

    const rolUser = userFound.rol;

    if (rolUser !== "administrador" && rolUser !== "superadmin") {
        return handleErrorClient(
            res,
            403,
            "Error al acceder al recurso",
            "Se requiere un rol de administrador o superadmin para realizar esta acción."
        );
    }
    next();
} catch (error) {
    handleErrorServer(
    res,
    500,
    error.message,
    );
}
}

export const isAdminOrSeller = (req, res, next) => {
    const userRole = req.user.rol; 

    if (userRole === "administrador" || userRole === "vendedor") {
        return next(); 
    }

    return res.status(403).json({ message: "No tienes permiso para realizar esta acción." });
}

export const isMecanic = (req, res, next) => {
    try {
        const userRole = req.user?.rol; // Asegúrate de que el rol del usuario esté disponible en req.user

        if (userRole === "mecanico") {
            return next(); // Permitir acceso
        } else {
            return res.status(403).json({ message: "Acceso denegado: Se requiere rol de mecánico" });
        }
    } catch (error) {
        console.error("Error en el middleware isMecanic:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
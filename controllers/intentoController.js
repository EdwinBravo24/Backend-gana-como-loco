const Intento = require('../models/Intento');

const obtenerIntentosUsuario = async (req, res) => {
    try {
        const userId = req.userId;

        // Obtener todos los intentos sin filtrar por resultado
        const intentos = await Intento.find()
            .populate('usuario', 'nombre email cedula ciudad telefono') // Agregamos "telefono"
            .lean();

        console.log("Intentos encontrados:", intentos); // Imprimir para verificar datos

        res.status(200).json(intentos); // Devolver los intentos con los datos de usuario completos
    } catch (error) {
        console.error("Error en obtenerIntentosUsuario:", error);
        res.status(500).json({ message: 'Error al obtener los intentos' });
    }
};

module.exports = {
    obtenerIntentosUsuario
};

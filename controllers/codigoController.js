const Codigo = require('../models/Codigo');
const Intento = require('../models/Intento');

const ingresarCodigo = async (req, res) => {
    const { codigo } = req.body;
    const userId = req.userId; // Extraer el userId del token JWT

    try {
        const codigoExistente = await Codigo.findOne({ codigo: codigo.toString() });

        if (!codigoExistente) {
            return res.status(404).json({ mensaje: 'Código no válido, sigue intentandolo, suerte para la proxima.' });
        }

        if (codigoExistente.estado !== 'libre') {
            return res.status(400).json({ mensaje: 'Código ya registrado.' });
        }

        // Actualizar el estado y asociar el código con el usuario
        codigoExistente.estado = userId; // Guardar el userId en el campo "estado"
        codigoExistente.fechaRegistro = new Date(); // Actualizar la fecha de registro
        codigoExistente.usuario = userId; // Asociar el código al usuario
        await codigoExistente.save();

        const nuevoIntento = new Intento({
            usuario: userId,
            codigo: codigoExistente.codigo,
            resultado: codigoExistente.premio ? 'ganador' : 'no_ganador',
            premio: codigoExistente.premio || null, // Registrar el premio si existe
        });

        await nuevoIntento.save(); // Guardar el nuevo intento

        return res.status(200).json({ mensaje: 'Código ingresado correctamente.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al procesar el código.', error });
    }
};

// Función para obtener los códigos registrados por un usuario
const obtenerCodigosRegistrados = async (req, res) => {
    const userId = req.userId; // Extraer el userId del token JWT

    try {
        // Asegúrate de que la consulta esté bien escrita
        const codigosRegistrados = await Codigo.find({ usuario: userId }).exec(); // Filtra por usuario

        if (codigosRegistrados.length === 0) {
            return res.status(404).json({ mensaje: 'No se han encontrado códigos registrados para este usuario.' });
        }

        res.status(200).json(codigosRegistrados); // Devuelve los códigos registrados
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener los códigos registrados.', error });
    }
};

module.exports = {
    ingresarCodigo,
    obtenerCodigosRegistrados
};

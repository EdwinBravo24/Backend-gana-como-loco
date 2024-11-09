// models/Codigo.js
const mongoose = require('mongoose');

const CodigoSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    premio: {
        type: String,
        required: true
    },
    estado: {
        type: String, // Esto ahora almacenará el userId en lugar de solo 'registrado' o 'libre'
        default: 'libre'
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Codigo', CodigoSchema);

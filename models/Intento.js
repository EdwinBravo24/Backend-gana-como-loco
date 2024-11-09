const mongoose = require('mongoose');

const IntentoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    codigo: {
        type: String,
        required: true
    },
    resultado: {
        type: String,
        enum: ['ganador', 'no_ganador'],
        required: true
    },
    premio: {
        type: String,
        default: null
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: 'intentos' // Asegura que Mongoose use la colección 'intentos'
});

module.exports = mongoose.model('Intento', IntentoSchema);

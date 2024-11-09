// models admin, para la vista de admin home.
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin'],
        default: 'admin'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);

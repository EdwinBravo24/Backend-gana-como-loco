// intentoRoutes.js
const express = require('express');
const router = express.Router();
const intentoController = require('../controllers/intentoController');
const { authMiddleware } = require('../controllers/middlewares'); // Ajusta la ruta según la ubicación real

router.get('/usuario', authMiddleware, intentoController.obtenerIntentosUsuario);

module.exports = router;

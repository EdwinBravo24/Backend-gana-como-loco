const express = require('express');
const router = express.Router();
const codigoController = require('../controllers/codigoController');
const { authMiddleware } = require('../controllers/middlewares'); // Asegúrate de tener el middleware de autenticación

router.post('/ingresar', authMiddleware, codigoController.ingresarCodigo);
router.get('/registrados', authMiddleware, codigoController.obtenerCodigosRegistrados); // Nueva ruta

module.exports = router;

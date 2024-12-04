// rutas archivosRoutes.js
const express = require('express');
const {subirArchivo,obtenerArchivosPorUsuario,obtenerArchivosGenerales, upload,eliminarArchivo} = require('../controllers/archivosController');
const { authMiddleware } = require('../controllers/middlewares');
const cors = require('cors');
const router = express.Router();

// Ruta para subir archivos (requiere autenticación y procesamiento de archivo)
const corsOptions = {
    origin: [
      'https://frontend-gana-como-loco.vercel.app', 
      'http://localhost:3000'
    ],
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };
  
  // Ruta para subir archivos con CORS específico
  router.post('/subir', 
    cors(corsOptions),
    authMiddleware,
    upload, 
    subirArchivo
  );
  
  // Manejar preflight requests
  router.options('/subir', cors(corsOptions));

// Ruta para obtener los archivos del usuario autenticado
router.get('/muro', authMiddleware, obtenerArchivosPorUsuario);

// Ruta para obtener todos los archivos (muro general)
router.get('/general', authMiddleware, obtenerArchivosGenerales);

router.delete('/eliminar/:id', authMiddleware, eliminarArchivo);

module.exports = router;

const express = require('express');
const { urlencoded, json } = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const archivosRoutes = require('./routes/archivosRoutes'); // Agregado

const app = express();

const PORT = process.env.PORT || 4000;

// Configuración general
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors({
    origin: [
      'https://frontend-gana-como-loco.vercel.app', 
      'http://localhost:4000' // Si también pruebas localmente
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // 30 segundos
    socketTimeoutMS: 45000  // 45 segundos
  }).then(() => {
    console.log('Conectado a MongoDB');
  }).catch(err => {
    console.error('Error de conexión a MongoDB:', err);
  });
// Rutas
app.use('/v1/users', userRoutes);
app.use('/v1/archivos', archivosRoutes); // Rutas de archivos
// Ruta de prueba para verificar si el backend está funcionando
app.get('/test', (req, res) => {
    res.status(200).send({ message: 'El backend está funcionando correctamente' });
});


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const express = require('express');
const { urlencoded, json } = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const codigoRoutes = require('./routes/codigoRoutes');
const intentoRoutes = require('./routes/intentoRoutes');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(json()); mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

app.use(urlencoded({ extended: true }));
app.use(cors());

app.use('/v1/users', userRoutes);
app.use('/v1/codigos', codigoRoutes);
app.use('/v1/intentos', intentoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


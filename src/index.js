const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
//Importamos el Milddleware de error handler
const errorHandler = require('./middlewares/errorHandler');


require('dotenv').config();

const jwtCheck = auth({
    audience: process.env.OAUTH_AUDIENCE,
    issuerBaseURL: process.env.OAUTH_URL,
    tokenSigningAlg: 'RS256'
});

const app = express();

app.use(express.json());

// Importamos el Router de Libros
const librosRouter = require('./routes/libros');

app.use('/api/libros', jwtCheck, librosRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log('Servidor iniciando desde el puerto 3000');
});

module.exports = app;
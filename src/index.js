const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
//Importamos el Milddleware de error handler
const errorHandler = require('./middlewares/errorHandler');


require('dotenv').config();

const jwtCheck = auth({
    audience: 'https://localhost:3000/api/libros',
    issuerBaseURL: 'https://dev-awhhrop25tjxku0v.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

const app = express();

app.use(express.json());

// Importamos el Router de Libros
const librosRouter = require('./routes/libros');

app.use('/api/libros', jwtCheck, librosRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Servidor iniciando desde el puerto 3000');
});

module.exports = app;
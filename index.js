const express = require('express');
const {auth} = require('express-oauth2-jwt-bearer');


//Importamos el router de libros
const librosRouter = require('./routes/libros');

//Importamos el Milddleware de error handler
const errorHandler = require('./middlewares/errorHandler');

const jwtCheck = auth({
    audience: 'https://localhost:3000/api/libros',
    issuerBaseURL: 'https://dev-awhhrop25tjxku0v.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

const app = express();

app.use(express.json());

app.use('/api/libros', jwtCheck, librosRouter);

app.use(errorHandler);

app.listen(3000, ()=> {
    console.log('Servidor iniciando desde el puerto 3000');
});
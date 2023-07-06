const express = require('express');
const app = express();

app.use(express.json());

//Importamos el router de libros
const librosRouter = require('./routes/libros');

//Importamos el Milddleware de error handler
// const errorHandler = require('./middlewares/errorHandler');

app.use('/libros', librosRouter);

// app.use(errorHandler);

app.listen(3000, ()=> {
    console.log('Servidor iniciando desde el puerto 3000');
});
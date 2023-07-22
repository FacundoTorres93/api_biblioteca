const express = require('express');
const router = express.Router();

const LibroController = require('../controllers/libroController.js')

const { requiredScopes} = require('express-oauth2-jwt-bearer');

// Ruta para obtener todos los libros de la biblioteca
router.get('/', requiredScopes('read:libros'), LibroController.getAllLibros);

// ruta para obtener Libros por ID
router.get('/:_id', requiredScopes('read:libros'), LibroController.getLibroById);

// Ruta para crear un nuevo libro 
router.post('/', requiredScopes('write:libros'), LibroController.createLibro);

//Ruta para actualizar un libro dentro de la biblioteca
router.put('/:id', requiredScopes('write:libros'), LibroController.updateLibro);

//Ruta para eliminar un libro de la biblioteca
router.delete('/:id', requiredScopes('write:libros'), LibroController.deleteLibro);

module.exports = router;

// const Libro = require('../models/Libro.js');
const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro.js');

const {requiredScopes} = require('express-oauth2-jwt-bearer');



// Ruta para obtener todos los libros de la biblioteca
router.get('/',requiredScopes('read:libros'), async (req, res, next) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch(err){
        next(err);
    }
});

// Ruta para crear un nuevo libro 
router.post('/',requiredScopes('write:libros'), async (req, res, next) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch(err){
        next(err);
    }
});

//Ruta para actualizar un libro dentro de la biblioteca
router.put('/:id',requiredScopes('write:libros'), async (req, res, next) => {
    try {
        const Libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(Libro);
    } catch(err){
        next(err);
    }
});

//Ruta para eliminar un libro de la biblioteca
router.delete('/:id',requiredScopes('write:libros'), async (req, res, next) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json(Libro);
    } catch(err){
        next(err);
    }
});

module.exports = router;
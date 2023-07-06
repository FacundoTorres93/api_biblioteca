const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro.js');



// Ruta para obtener todos los libros de la biblioteca
router.get('/', async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener los libros'
        })
    }
});

// Ruta para crear un nuevo libro 
router.post('/', async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({
            error: 'Error al crear el libro'
        });
    }
});

//Ruta para actualizar un libro dentro de la biblioteca
router.put('/:id', async (req, res) => {
    try {
        const Libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(Libro);
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo actualizar el libro solicitado'
        })
    }
});

//Ruta para eliminar un libro de la biblioteca
router.delete('/:id', async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json(Libro);
    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar el libro solicitado'
        })
    }
});

module.exports = router;
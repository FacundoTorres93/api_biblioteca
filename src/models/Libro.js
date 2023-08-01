const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI, { 
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// });

const libroSchema = new mongoose.Schema({
    // id: String,
    titulo: String,
    autor: String,
    email: String,
},{collection: 'libros'});

const Libro = mongoose.model('Libro', libroSchema);

module.exports = Libro;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var productoSchema = new Schema({
    codprodu: {
        type: String,
        required: [true, 'El codigo de producto es necesario']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    precioUni: {
        type: Number,
        required: [true, 'El precio únitario es necesario']
    },
    descripcion: {
        type: String,
        required: false
    },
    disponible: {
        type: Boolean,
        required: true,
        default: true
    },
    img: {
        type: String,
        require: false
    },
    codcate: {
        type: String,
        require: [true, 'Codigo Interno es necesario']
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoria',
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario"
    },
});

module.exports = mongoose.model('producto', productoSchema);
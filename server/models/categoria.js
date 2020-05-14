const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        require: [true, 'La Descripcion es necesario']
    },
    img: {
        type: String,
        require: false
    },
    disponible: {
        type: Boolean,
        required: true,
        default: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario"
    },
});

categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
})

module.exports = mongoose.model('categoria', categoriaSchema);
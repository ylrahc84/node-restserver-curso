const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    codcate: {
        type: String,
        require: [true, 'Codigo Interno es necesario']
    },
    nomcategoria: {
        type: String,
        require: [true, 'La Descripcion es necesario']
    },
    fotourl: {
        type: String,
        require: false
    },
    visible: {
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
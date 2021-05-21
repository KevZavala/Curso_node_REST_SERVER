const { Schema, model } = require('mongoose');


const productoSchema = Schema({


    nombre: {
        type: String,
        required:[true, 'El nombre de producto es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado del producto es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    costo: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'La categoria es obligatoria']
    },
    desc: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    }



});


module.exports = model('Producto', productoSchema);
const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const  Usuario  = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
]

const buscarUsuarios = async(term='', res=response) => {

    const esMongoID = ObjectId.isValid(term);

    if(esMongoID) {
        const usuario = await Usuario.findById(term);

        if (!usuario) {
            return res.status(400).json({
                msg: `Usuario con id ${term} no encontrado`
            });
        } else {
            res.json({
                usuario
            });
        }
    }

}

const buscarCategoria = async (term='', res) => {

    term = term.toUpperCase();

    const categorias = await Categoria.findOne({nombre: term});

    if(!categorias) {
        return res.status(400).json({
            msg: `No existen categorias que se llamen: ${term}`
        });
    } else {
        res.json({
            categorias
        });
    }
}

const buscarProductos = async (term, res) => {

    const productos = await Producto.find({
        nombre: {$regex:term, $options: 'i'}
    });

    if(!productos) {
        return res.status(400).json({
            msg: `No hay productos que coincidan con el termino ${term}`
        });
    } else {
        res.json({
            productos
        });
    }


}

const getBusqueda = async (req, res) => {

    const { collection, term } = req.params;

    if(!coleccionesPermitidas.includes(collection)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    switch(collection) {
        case 'usuarios':
            await buscarUsuarios(term, res);
            break;
        case 'categorias':
            await buscarCategoria(term,res);
            break;
        case 'productos':
            await buscarProductos(term, res);
            break;
        default:
            return res.status(400).json({
                msg: 'Busqueda no encotrada'
            });
    }

}


module.exports = {
    getBusqueda
}
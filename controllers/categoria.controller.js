const { response } = require('express');
const { Categoria } = require('../models');


const categoriaGet = async (req, res) => {

    const { limit=5, page=1 } = req.query;

    const categoriasDB = await Categoria.find()
                        .limit(Number(limit))
                        .skip(10 * (Number(page) - 1))
                        .populate('usuario');


    res.json({
        page,
        categorias: categoriasDB
    });

}

const categoriaGetById = async (req, res) => {

    const {id} = req.params;

    const categoriaDB = await Categoria.findById(id)
                            .populate('usuario');

    if(!categoriaDB) {
        return res.status(400).json({
            msg: 'No existe la categoria'
        });
    } else {
        return res.json({
            categoria: categoriaDB
        });
    }
}

const categoriaPost = async (req, res = response) => {

    const nombre = `${req.body.nombre}`.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if (categoriaDB) {
        return res.status(400).json({
            msg: `la categoria ${nombre} ya existe`
        });
    }
    const data = {
        nombre,
        usuario: req.usuario._id
    };
    
    const nuevaCategoria =  new Categoria(data);
    await nuevaCategoria.save();

    res.json({
        msg: 'categoria creada',
        nuevaCategoria
    })
}

const categoriaPut = async (req, res) => {

    const {id} = req.params;
    const nombre = `${req.body.nombre}`.toUpperCase();
    const data = {
        nombre
    }
    data.usuario = req.usuario._id;
    const categoriaDB = await Categoria.findByIdAndUpdate(id, data, {new: true})
                            .populate('usuario');


    res.json({
        categoria: categoriaDB
    })

}

const categoriaDelete = async (req, res) => {

    const {id} = req.params;

    const categoriaDB = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true})
                        .populate('usuario');

    if (!categoriaDB) {
        return res.status(400).json({
            msg: `No existe una categoria con ID ${id}`
        });
    }

    res.json({
        msg: 'Categoria inactiva',
        categoria: categoriaDB
    });

}


module.exports = {
    categoriaGet,
    categoriaPost,
    categoriaGetById,
    categoriaPut,
    categoriaDelete
}
const { request, response } = require('express');
const  bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


const userGet = async (req = request, res = response) => {

    const {limite = 4, desde = 0} = req.query;
    const query = {estado: true};

    const usuariosPromise = Usuario.find()
        .skip(Number(desde))
        .limit(Number(limite));

    const totalPromise = Usuario.countDocuments(query);

    const [usuarios, total] = await Promise.all([
        usuariosPromise, totalPromise
    ])

    res.json({
        message: 'get API - controller',
        usuarios, total
    });
}

const userPost = async (req, res = response) => {
    
    const {nombre, correo, password, role} = req.body;
    const usuario = new Usuario({nombre, correo, password, role});

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.json({
        message: 'post API - controller',
        usuario
    });
}

const userPut = async (req, res = response) => {

    const id = req.params.id;

    const { _id, password, google, correo, ...resto } = req.body;

    // TODO: validar contra DB

    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.json({
        message: 'put API - controller',
        usuario
    });
}

const userPatch = (req, res = response) => {
    res.json({
        message: 'patch API - controller'
    });
}

const userDelete = async (req, res = response) => {

    const id = req.params.id;

    // const eliminado = await Usuario.findByIdAndDelete(id);

    const desactivado = await Usuario.findByIdAndUpdate(id,{estado: false});

    res.json({
        desactivado
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}
const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res= response, next) => {

    const token = req.header('x-token');
    if (!token) return res.status(401).json({msg: 'No hay un token en la petición'});
    
    try {

        const {uid} = jwt.verify(token, process.env.SECRET_KEY);
        
        const usuario = await Usuario.findById(uid);
        
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe'
            });
        }

        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            });
        }

        req.usuario = usuario;

        next();

    } catch( err ){
        console.log(err);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }


}


module.exports = {
    validarJWT
};
const { response } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');
const login = async (req, res = response) => {

    const { correo, password } = req.body;
    
    try{
        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        // Verificar si el usuario está activo
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }
        //Verificar el password
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        // generar JWT
        const token = await generarJWT(usuario.id)

        res.json({usuario,token})

    }catch(err) {
        console.log(err);
        res.json({
            msg: 'Algo ha salido mál',
            err
        });
    }

    
}

module.exports = {
    login
}
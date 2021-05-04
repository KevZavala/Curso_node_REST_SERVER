const { response } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res) => {

    const { id_token } = req.body;

    try{

        const {correo, nombre, img} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true,
                role: 'USER_ROLE'
            };
            usuario = new Usuario(data);
            await usuario.save();
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con admin, usuario bloqueado'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    }catch(e){
        console.log(e);
        res.status(400).json({
            msg: 'token de google no reconocido'
        });
    }


}

module.exports = {
    login,
    googleSignIn
}
const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const routesAuth = Router();


routesAuth.get('/',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login)

routesAuth.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
],googleSignIn)

module.exports = routesAuth;
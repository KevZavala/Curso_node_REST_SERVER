const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPost, userPut, userDelete, userPatch } = require('../controllers/user.controller');

// const {validarCampos} = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validarJWT');
// const { tieneRole } = require('../middlewares/validar-roles');

const { validarCampos, validarJWT, tieneRole } = require('../middlewares');

const { esRoleValido, existeEmail, existeUsuarioId } = require('../helpers/db-validators');


const routesUsuarios = Router();

routesUsuarios.get('/', userGet);

routesUsuarios.post('/',[
    check('password', 'El password debe tener más de 6 letras').isLength(6), 
    check('nombre', 'El nombre no es válido').not().isEmpty(), 
    check('correo', 'El correo no es válido').isEmail(),
    check('role').custom(esRoleValido),
    check('correo').custom(existeEmail),
    validarCampos,
],userPost);

routesUsuarios.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('role').custom(esRoleValido),
    validarCampos
], userPut);

routesUsuarios.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos,
], userDelete);


module.exports = routesUsuarios;
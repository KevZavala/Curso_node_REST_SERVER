const { validarCampos } = require('./validar-campos');
const { validarJWT } = require('./validarJWT');
const { tieneRole } = require('../middlewares/validar-roles');



module.exports = {
    validarCampos,
    validarJWT,
    tieneRole
}
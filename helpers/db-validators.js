const Role = require('../models/role');
const Usuario = require('../models/usuario')
const esRoleValido = async (role = '') => {
    const existeRole = await Role.findOne({role});
    if(!existeRole) {
        throw new Error(`El role ${role}, no está en la DB`);
    }
}

const existeEmail = async( correo= '' ) => {

    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail) {
        throw new Error(`El email ${correo} ya existe`);
    }

}

const existeUsuarioId = async( id= '' ) => {

    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    }

}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioId
};

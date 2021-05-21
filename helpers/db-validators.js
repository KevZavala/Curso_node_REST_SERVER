const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');

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

const existeCategoriaId = async( id='' ) => {

    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria || !existeCategoria.estado) {
        throw new Error(`La categoria con id ${id} no existe o está inactiva`);
    }

}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioId,
    existeCategoriaId
};

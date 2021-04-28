const { response } = require("express")



const esAdminRole = (req, res = response, next) => {

    if( ! req.usuario) {
        return res.status(500).json({
            msg: 'Se requiere verificar el role sin validar el token'
        });
    }

    const { role, nombre } = req.usuario;

    if(role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    }
    next();

}

const tieneRole = ( ...roles ) => {
    
    return (req, res, next) => {

        if( ! req.usuario) {
            return res.status(500).json({
                msg: 'Se requiere verificar el role sin validar el token'
            });
        }
        if(!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `El servicio requiere algun role de ${roles}`
            });
        }


        next();
    }

}

module.exports = {
    esAdminRole, tieneRole
}
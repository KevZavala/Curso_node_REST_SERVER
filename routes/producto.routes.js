const { Router } = require('express');
const { check } = require('express-validator');
const { postProducto, getProductos, getProducto, putProducto, deleteProducto } = require('../controllers/producto.controller');
const { esAdminRole, validarJWT, validarCampos } = require('../middlewares');
const { existeCategoriaId } = require('../helpers/db-validators');

const routesProductos = Router();


routesProductos.get('/',[
    validarJWT,
],getProductos);

routesProductos.get('/:id', [
    validarJWT,
    check('id').not().isEmpty(),
    validarCampos
], getProducto);

routesProductos.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre').not().isEmpty(),
    check('categoria').not().isEmpty(),
    check('categoria').custom(existeCategoriaId),
    validarCampos
], postProducto);

routesProductos.put('/:id', [
    validarJWT,
    esAdminRole,
    check('nombre').not().isEmpty(),
    check('categoria').not().isEmpty(),
    check('categoria').custom(existeCategoriaId),
    validarCampos
], putProducto);

routesProductos.delete('/:id',[
    validarJWT,
    esAdminRole,
], deleteProducto);

module.exports = routesProductos;
const { Router } = require('express');
const {categoriaPost, categoriaGet, categoriaGetById, categoriaPut, categoriaDelete}  = require('../controllers/categoria.controller')
const { validarJWT, validarCampos } = require('../middlewares/')
const {existeCategoriaId } = require('../helpers/db-validators');
const { check } = require('express-validator');

const routesCategorias = Router();

routesCategorias.get('/', [
    validarJWT,
],  categoriaGet);
routesCategorias.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriaPost);

routesCategorias.get('/:id',[
    validarJWT
], categoriaGetById);

routesCategorias.put('/:id',[
    validarJWT,
    check('nombre').not().isEmpty(),
    check('id', 'El id de la categoria no existe').custom(existeCategoriaId),
    validarCampos
],categoriaPut);

routesCategorias.delete('/:id',[
    validarJWT,
    validarCampos
], categoriaDelete)

module.exports = routesCategorias;
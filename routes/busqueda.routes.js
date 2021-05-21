const { Router } = require('express');
const { getBusqueda } = require('../controllers/busqueda.controller');

const routesBusquedas = Router();


routesBusquedas.get('/:collection/:term', getBusqueda);

module.exports = routesBusquedas;
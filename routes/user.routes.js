const { Router } = require('express');
const { userGet, userPost, userPut, userDelete, userPatch } = require('../controllers/user.controller');

const routesUsuarios = Router();



routesUsuarios.get('/', userGet);

routesUsuarios.post('/', userPost);

routesUsuarios.put('/:id', userPut);

routesUsuarios.delete('/', userDelete);


module.exports = routesUsuarios;
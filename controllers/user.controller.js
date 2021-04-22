const { request, response } = require('express');

const userGet = (req = request, res = response) => {

    const query = req.query;

    res.json({
        message: 'get API - controller',
        query
    });
}

const userPost = (req, res = response) => {

    const body = req.body;

    res.json({
        message: 'post API - controller',
        body
    });
}

const userPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        message: 'put API - controller',
        id
    });
}

const userPatch = (req, res = response) => {
    res.json({
        message: 'patch API - controller'
    });
}

const userDelete = (req, res = response) => {
    res.json({
        message: 'delete API - controller'
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}
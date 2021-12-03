const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    
    const {q, nombre='No name', apiKey, page = 1, limit} = req.query;        // recibe los parametros que se envian por la url

        res.json({
            msg: "get API - usuariosGet",
            q,
            nombre,
            apiKey,
            page,
            limit
        });
}
    
const usuariosPost = (req, res) => {

    console.log("Post");


    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: "post API - usuariosPost",
        nombre,
        edad
        });
    
}
    
const usuariosPut = (req, res) => {
    
    const id = req.params.id;   // recibe el id de la request que hace el usuario

        res.json({
            msg: "put API - usuariosPut",
            id
        });
}
    
const usuariosDelete = (req, res) => {
        res.json({
            msg: "delete API - usuariosDelete"
        });
}
    

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
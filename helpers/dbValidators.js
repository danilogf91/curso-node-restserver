const { response, request } = require('express');
const Categoria = require('../models/categoria');
const Item = require('../models/item');

const verificaSiExisteItem = async (req, res = response, next) => {
    
    const { estado, ...body } = req.body;

    if (body.razonSocial) {
        const name = body.razonSocial.toUpperCase();
        
        const itemDB = await Item.findOne( {razonSocial: name} );

        if (itemDB) {
            return res.status(400).json({
                msg: `El item '${body.razonSocial}' ya existe dbValidators`
            });
        }
    } 


    // da paso al siguiente middleware sino sigue con el controlador
    next();
}

const verificaSiExisteCategoria = async (req, res = response, next) => {
    
    const { estado, ...body } = req.body;

    if (body.tipo) {
        const name = body.tipo.toUpperCase();
        
        const itemDB = await Categoria.findOne( {tipo: name} );

        if (itemDB) {
            return res.status(400).json({
                msg: `El item '${body.tipo}' ya existe dbValidators`
            });
        }
    } 


    // da paso al siguiente middleware sino sigue con el controlador
    next();
}




module.exports = {
    verificaSiExisteItem,
    verificaSiExisteCategoria
}
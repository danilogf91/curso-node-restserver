const { Router } = require('express');
const { check } = require('express-validator');

const {
        itemsPut,  
        itemsDelete, 
        obtenerItems,
        crearItem } = require('../controllers/items');
        
const { verificaSiExisteItem } = require('../helpers/dbValidators');
        
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

// funciones declaradas en controladores, usadas para manejar las rutas 
router.get('/', obtenerItems);
    
router.post('/', [
    check('razonSocial', 'La razonSocial es obligatoria check').not().isEmpty(),
    check('ruc', 'El ruc es obligatorio check').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria check').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio check').not().isEmpty(),
    check('email1', 'El email es obligatorio check').isEmail(),
    verificaSiExisteItem,
    validarCampos, 
], crearItem);
    
        
    router.put('/:id', itemsPut);

    router.delete('/', itemsDelete);
    

module.exports = router;
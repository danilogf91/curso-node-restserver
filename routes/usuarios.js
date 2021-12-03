
const { Router } = require('express');
const {
        usuariosGet,
        usuariosPost, 
        usuariosPut,  
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

// funciones declaradas en controladores, usadas para manejar las rutas 
    router.get('/', usuariosGet);
    
    router.post('/', usuariosPost);
        
    router.put('/:id', usuariosPut);

    router.delete('/', usuariosDelete);
    

module.exports = router;
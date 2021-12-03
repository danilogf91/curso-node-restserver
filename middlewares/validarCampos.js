const {validationResult} = require('express-validator');

const validarCampos = (req, res, next) => {
    // valida si existen errores en los datos enviado, el correo es valido o no
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    // da paso al siguiente middleware sino sigue con el controlador
    next();
}

module.exports = {
    validarCampos
}
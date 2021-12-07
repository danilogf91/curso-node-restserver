const { check } = require("express-validator");

const { Router } = require("express");
const {
  categoriasPut,
  categoriasDelete,
  obtenerCategorias,
  crearCategorias,
  nuevaCategoria,
} = require("../controllers/categorias");
const { verificaSiExisteCategoria } = require("../helpers/dbValidators");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

// funciones declaradas en controladores, usadas para manejar las rutas
router.get("/", obtenerCategorias);
router.get("/nueva", nuevaCategoria);

router.post(
  "/nueva",
  [
    check("tipo", "El tipo es obligatoria check").not().isEmpty(),
    check("descripcion", "La descripción es obligatoria check").not().isEmpty(),
    check("usuario", "El usuario es obligatorio check").not().isEmpty(), // verificar el token del usuario
    verificaSiExisteCategoria,
    validarCampos,
  ],
  crearCategorias
);

router.put("/:id", categoriasPut);

router.delete("/", categoriasDelete);

module.exports = router;

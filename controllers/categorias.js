const { response, request } = require("express");
const Categoria = require("../models/categoria");

const obtenerCategorias = async (req, res = response) => {
  const { limite = 4, desde = 1 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .skip(Number((desde - 1) * limite))
      .limit(Number(limite)),
  ]);

  let currentPage = desde * 1;
  let sigPage = currentPage * 1 + 1;
  let antPage = currentPage * 1 - 1;
  let numPages = Math.ceil(total / limite);
  // console.log(
  //   "Total de paginas=",
  //   numPages,
  //   "Pagina actual=",
  //   currentPage,
  //   "Siguiente pagina actual=",
  //   sigPage
  // );

  res.status(200).render("categoria", {
    title: "Totas las Categorias",
    total,
    numberPerPage: limite * 1,
    numPages,
    currentPage,
    sigPage,
    antPage,
    categorias,
  });
};

const crearCategorias = async (req, res = response) => {
  const { estado, ...body } = req.body;

  const categoriaName = body.tipo.toUpperCase();

  const categoriaDB = await Categoria.findOne({ tipo: categoriaName });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.tipo} ya existe en crear categoria`,
    });
  }

  // Generar la data a guardar

  const data = {
    ...body,
    tipo: body.tipo.toUpperCase(),
    //usuario: req.usuario._id
  };

  const categoria = new Categoria(data);

  // Guardar DB
  await categoria.save();

  res.status(201).json({
    status: "success",
    categoria,
  });
};

const nuevaCategoria = async (req, res = response) => {
  const { estado, ...body } = req.body;
  console.log("Ingresaste a crear categoria");

  res.status(200).render("nuevaCategoria", {
    title: "Crear categoria",
  });
};

const categoriasPut = (req, res) => {
  const id = req.params.id; // recibe el id de la request que hace el usuario

  res.json({
    msg: "put API - categoriasPut",
    id,
  });
};

const categoriasDelete = (req, res) => {
  res.json({
    msg: "delete API - categoriasDelete",
  });
};

module.exports = {
  categoriasPut,
  categoriasDelete,
  obtenerCategorias,
  crearCategorias,
  nuevaCategoria,
};

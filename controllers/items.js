const { response, request } = require("express");
const Item = require("../models/item");

const obtenerItems = async (req, res = response) => {
  const { limite = 4, desde = 1 } = req.query;

  const [total, items] = await Promise.all([
    Item.countDocuments(),
    Item.find()
      .skip(Number((desde - 1) * limite))
      .limit(Number(limite)),
    ,
  ]);

  let currentPage = desde * 1;
  let sigPage = currentPage * 1 + 1;
  let antPage = currentPage * 1 - 1;
  let numPages = Math.ceil(total / limite);
  console.log(
    "Total de paginas=",
    numPages,
    "Pagina actual=",
    currentPage,
    "Siguiente pagina actual=",
    sigPage
  );

  res.status(200).render("items", {
    title: "Todos los items",
    total,
    numberPerPage: limite * 1,
    numPages,
    currentPage,
    sigPage,
    antPage,
    items,
  });
};

const crearItem = async (req, res = response) => {
  const { estado, ...body } = req.body;
  const searchName = body.razonSocial.toUpperCase();

  const itemDB = await Item.findOne({ razonSocial: searchName });

  if (itemDB) {
    return res.status(400).json({
      msg: `El item ${itemDB.razonSocial} ya existe crear Item`,
    });
  }

  // Generar la data a guardar

  const data = {
    ...body,
    razonSocial: body.razonSocial.toUpperCase(),
    //usuario: req.usuario._id
  };

  const item = new Item(data);

  // Guardar DB
  await item.save();

  res.status(201).json(item);
};

const itemsGet = (req = request, res = response) => {
  const { q, nombre = "No name", apiKey, page = 1, limit } = req.query; // recibe los parametros que se envian por la url

  res.json({
    msg: "get API - itemsGet",
    q,
    nombre,
    apiKey,
    page,
    limit,
  });
};

const itemsPost = (req, res) => {
  const { nombre, edad } = req.body;

  res.status(201).json({
    msg: "post API - itemsPost",
    nombre,
    edad,
  });
};

const itemsPut = (req, res) => {
  const id = req.params.id; // recibe el id de la request que hace el usuario

  res.json({
    msg: "put API - itemsPut",
    id,
  });
};

const itemsDelete = (req, res) => {
  res.json({
    msg: "delete API - itemsDelete",
  });
};

module.exports = {
  itemsGet,
  itemsPost,
  itemsPut,
  itemsDelete,
  obtenerItems,
  crearItem,
};
